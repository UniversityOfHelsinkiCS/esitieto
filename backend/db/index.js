require('dotenv').config();

// Leaving here if some of you need to debug something
//console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
//console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);


const { Pool } = require('pg')

const selectPool = () => {
  if (process.env.DATABASE_POOLMODE === "direct") {
    console.log("Using direct DATABASE_POOLMODE")
    return new Pool({
      connectionString: process.env.DATABASE_DIRECT
    });
  } else {
    console.log("Using default DATABASE_POOLMODE")
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
    console.log('Successful database connection primary. Current time from DB:', response.rows[0].now);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

testDatabaseConnection();

// Course CRUD

const addCourse = async (official_course_id, course_name, kori_name) => {
  const { rows } = await pool.query(
    'INSERT INTO course_info (official_course_id, course_name, kori_name) VALUES ($1, $2, $3) RETURNING *',
    [official_course_id, course_name, kori_name]
  );
  return rows[0];
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

const addPrerequisiteCourse = async (course_kori_name, prerequisite_course_kori_name) => {
  const { rows } = await pool.query(
    `INSERT INTO prerequisite_course_relation (course_kori_name, prerequisite_course_kori_name)
     VALUES ($1, $2) RETURNING *`,
    [course_kori_name, prerequisite_course_kori_name]
  );
  return rows[0];
};

const removePrerequisiteCourse = async (course_kori_name, prerequisite_course_kori_name) => {
  // Additional logic to prevent deletion if course_kori_name equals prerequisite_course_kori_name
  if (course_kori_name === prerequisite_course_kori_name) {
    console.error("Cannot remove a course as its own prerequisite.");
    return; // Exit the function or handle the error appropriately
  }

  const { rowCount } = await pool.query(
    `DELETE FROM prerequisite_course_relation
     WHERE course_kori_name = $1 AND prerequisite_course_kori_name = $2`,
    [course_kori_name, prerequisite_course_kori_name]
  );

  if (rowCount === 0) {
    console.error("No prerequisite was removed. Check if the specified relation exists.");
  } else {
    console.log("Prerequisite removed successfully.");
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