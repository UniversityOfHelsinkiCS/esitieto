require('dotenv').config();
const logger = require('../middleware/logger');
// Leaving here if some of you need to debug something
//logger.info('POSTGRES_USER:', process.env.POSTGRES_USER);
//logger.info('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
logger.info(`DATABASE_HOST: ${process.env.DATABASE_HOST}`);
logger.info(`DATABASE_PORT: ${process.env.DATABASE_PORT}`);
logger.info(`DATABASE_NAME: ${process.env.DATABASE_NAME}`);
const KoriInterface = require('../interfaces/koriInterface');


const { Pool } = require('pg');
const { add } = require('winston');
const kori = new KoriInterface();

const selectPool = () => {
  if (process.env.DATABASE_POOLMODE === "direct") {
    logger.info("Using direct DATABASE_POOLMODE")
    return new Pool({
      connectionString: process.env.DATABASE_DIRECT
    });
  } else {
    logger.info("Using default DATABASE_POOLMODE")
    return new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    });
  }
};

const pool = selectPool();

const testDatabaseConnection = async () => {
  try {
    const response = await pool.query('SELECT NOW()');
    logger.info('Successful database connection primary. Current time from DB:', response.rows[0].now);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

testDatabaseConnection();

// Course CRUD

const addCourse = async (addedCourse) => {
  const response = await kori.searchCourses(addedCourse);
  const exactMatch = response.searchResults.find(course => course.name === addedCourse || course.code === addedCourse);
  if (!exactMatch) {
    console.error(`No exact match found for course ${addedCourse}`);
    return;
  }
  const { name, groupId, code } = exactMatch; 
  const detailString = `('${groupId}', '${name}', '${code}')`;

  try {
    const { rows } = await pool.query(
      `INSERT INTO courses (kori_id, course_name, hy_course_id)
      SELECT $1, $2, $3
      ON CONFLICT (kori_id) DO NOTHING
      RETURNING *`,
      [groupId, name, code]
    );
    if (rows.length === 0) {
      logger.debug(`Course ${addedCourse} already exists in the database.`);
      return;
    }
    return rows[0];
  } catch (err) {
    console.error(`Error adding course ${addedCourse} to the database: \n`);
  }
};

const addManyCourses = async (listOfCourses) => {
  /*
  Accepts a list of courses objects and adds them to the database.

  Works with exact matches of HY course id and course name. 
  
  Note: Course names might not be unique, but the course ids are.
  */
  await Promise.all(listOfCourses.map(async course => {
    await addCourse(course);
  }))};


const addManyPrequisiteCourses = async (listOfPrerequisites) => {
  /* Accepts list of objects that represents a course and its prerequisites.

  The expected format for the prerequisite object is for example:
  [
    {
      course: 'TKT20018',
      prerequisiteCourse: 'TKT10003',
      relationType: 'optional'
    },
    {
      course: 'TKT20018',
      prerequisiteCourse: 'TKT10004',
      relationType: 'optional'
    },
  ]
  */

  for (const prerequisite of listOfPrerequisites) {
    const { course, prerequisiteCourse, relationType } = prerequisite;
    try {
      const result = await addPrerequisiteCourse(course, prerequisiteCourse, relationType);
      if (result) {
        logger.info(`Prerequisite for course ${course} with prerequisite ${prerequisiteCourse} of type '${relationType}' successfully added to the database.`);
      } else {
        logger.debug(`No new prerequisite relation added for course ${course} with prerequisite ${prerequisiteCourse}. It might already exist.`);
      }
    } catch (err) {
      logger.error(`Error adding prerequisite for course ${course} with prerequisite ${prerequisiteCourse} to the database:`, err);
    }
  }
};



const updateCourse = async (id, official_course_id, course_name, kori_name) => {
  const { rows } = await pool.query(
    'UPDATE course_info SET official_course_id = $2, course_name = $3, kori_name = $4 WHERE id = $1 RETURNING *',
    [id, official_course_id, course_name, kori_name]
  );
  return rows[0];
};

const deleteCourse = async (kori_name) => {
  const result = await pool.query('DELETE FROM course_info WHERE kori_name = $1 RETURNING *', [kori_name]);
  return result.rowCount;
};


const getCourses = async () => {
  const { rows } = await pool.query('SELECT * FROM course_info');
  return rows;
};

// Dependency

const addPrerequisiteCourse = async (course_hy_id, prerequisite_course_hy_id, relation_type) => {
  const query = `
  INSERT INTO prerequisite_courses (course_id, prerequisite_course_id, relation_type)
  SELECT c1.id, c2.id, $3
  FROM (SELECT id FROM courses WHERE hy_course_id = $1) AS c1, 
       (SELECT id FROM courses WHERE hy_course_id = $2) AS c2
  ON CONFLICT ON CONSTRAINT unique_course_prerequisite DO NOTHING
  RETURNING *`;
  const { rows } = await pool.query(
    query,
    [course_hy_id, prerequisite_course_hy_id, relation_type]
  );
  return rows[0];
};


// Frontend is not fixed for this yet
const removePrerequisiteCourse = async (course_hy_id, prerequisite_course_hy_id) => {
  /* 
  Receives args course_id and prerequisite_course_id and removes the relation from the database. 
  The id's are like TKT10001, TKT10002 etc.
  */
  const { rowCount } = await pool.query(
    `DELETE FROM prerequisite_courses
    WHERE course_id = (SELECT id FROM courses WHERE courses.hy_course_id = $1) AND 
          prerequisite_course_id = (SELECT id FROM courses WHERE courses.hy_course_id = $2)`,
    [course_hy_id, prerequisite_course_hy_id]
  );

  if (rowCount === 0) {
    logger.error("No prerequisite was removed. Check if the specified relation exists.");
  } else {
    logger.info("Prerequisite removed successfully.");
  }
};

// Complex, need to move them to a separate file later!

// Fetches a course and all it's required courses recursively.
async function fetchCourseWithPrerequisites(courseKoriName) {
  const allCourses = await fetchAllCoursesWithDirectPrerequisites();

  // Create a mapping of kori_name to official_course_id for direct lookup
  const koriNameToOfficialIdMap = new Map(allCourses.map(course => [course.course, course.official_course_id]));

  function buildCourseGraph(koriName, coursesMap, visited = new Set()) {
    if (visited.has(koriName)) {
      // TODO: add dependency for already drawn course
      return null; // Prevent infinite recursion
    }
    visited.add(koriName);

    const course = coursesMap.get(koriName);
    if (!course) return null;

    const courseWithDependencies = {
      name: course.course_name,
      identifier: course.official_course_id,
      koriName: koriName, // Adding koriName to the course object
      dependencies: course.direct_prerequisites
        .map(prerequisiteKoriName => buildCourseGraph(prerequisiteKoriName, coursesMap, visited))
        .filter(Boolean) // Ensure only valid courses are included
    };
    return courseWithDependencies;
  }

  const coursesMap = new Map(allCourses.map(course => [course.course, course]));

  const courseGraph = buildCourseGraph(courseKoriName, coursesMap);

  // Function to transform the graph into the desired array structure
  function transformGraphToArray(courseGraph, array = []) {
    if (courseGraph) {
      // Transform the current course into the desired object structure
      const courseObject = {
        name: courseGraph.name,
        kori_name: courseGraph.koriName,
        official_course_id: courseGraph.identifier,
        // Replace kori_names in dependencies with official_course_id using the map
        dependencies: courseGraph.dependencies.map(dep => koriNameToOfficialIdMap.get(dep.koriName)).filter(Boolean)
      };
      array.push(courseObject);

      // Recursively process each dependency to flatten the structure
      courseGraph.dependencies.forEach(dependency => {
        transformGraphToArray(dependency, array);
      });
    }
    return array;
  }

  // Use the transform function to convert the graph into the array of courses
  return transformGraphToArray(courseGraph);
}

async function fetchAllCoursesWithDirectPrerequisites() {
  const { rows } = await pool.query(`
    SELECT
      ci.kori_name AS "course",
      ci.course_name,
      ci.official_course_id,
      COALESCE(ARRAY_AGG(pcr.prerequisite_course_kori_name) FILTER (WHERE pcr.prerequisite_course_kori_name IS NOT NULL), ARRAY[]::VARCHAR[]) AS "direct_prerequisites"
    FROM
      course_info ci
    LEFT JOIN
      prerequisite_course_relation pcr ON ci.kori_name = pcr.course_kori_name
    GROUP BY ci.kori_name, ci.course_name, ci.official_course_id;
  `);
  return rows;
}


// ------------ TESTING ONLY ----------------

const getAllCoursesWithPrerequisites = async () => {
  const { rows } = await pool.query(`
    SELECT 
      c.kori_name as course, 
      p.prerequisite_course_kori_name as prerequisite
    FROM 
      course_info c
    LEFT JOIN 
      prerequisite_course_relation p ON c.kori_name = p.course_kori_name
  `);
  return rows;
};





module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  getAllCoursesWithPrerequisites,
  fetchCourseWithPrerequisites,
  addPrerequisiteCourse,
  removePrerequisiteCourse,
  getCourses,
  addCourse,
  addManyCourses,
  addManyPrequisiteCourses,
  updateCourse,
  deleteCourse,
  endDatabase: async () => {
    await pool.end();
  },
};

/*
exports.query = (text, params, callback) => {
  return pool.query(text, params, callback)
}

export async function getCourses() {
  const { rows } = await pool.query('SELECT * FROM Courses');
  return rows;
}

export async function endDatabase() {
  await pool.end();
}
*/