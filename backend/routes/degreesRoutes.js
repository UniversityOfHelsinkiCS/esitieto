const express = require('express');
const router = express.Router();
//const { findAndFilterMandatoryModuleRules, findModulesWithCourses } = require('../utils/helsinkiFilters');
//const HelsinkiInterface = require('../interfaces/helsinkiInterface');
//const helsinkiInterface = new HelsinkiInterface();
const { pool } = require('../dbStartup');
const logger = require('../middleware/logger');


router.get('/', async (req, res) => {
  /*
  Fetches all degrees from the database and returns them as a JSON array.
  */
  try {
    const result = await pool.query('SELECT * FROM degrees');
    const degrees = result.rows.map(degree => ({ degree_name: degree.degree_name }));
    logger.verbose("Degrees fetched:", degrees);
    res.json(degrees);
  } catch (error) {
    logger.error(`Error fetching degrees: ${error.message}`);
    res.status(500).send('Server error');
  }
});

router.get('/search_by_degree', async (req, res) => {
  /*
  Fetches the degree structure from the database using the degree name and year.
  */

  const degreeName = req.headers['degree-name'].toLowerCase();
  const degreeYears = req.headers['degree-years'];
  logger.info(`Fetching degree with name: ${degreeName} and year: ${degreeYears}`);

  try {
    const query = `SELECT id FROM degrees WHERE hy_degree_id = $1 AND degree_years = $2`;
    const { rows } = await pool.query(
      query, [degreeName, degreeYears]
    );

    degreeId = rows[0].id;
    const query2 = `
      SELECT c.course_name AS name, c.kori_id, c.hy_course_id AS identifier, cdr.relation_type AS type,
        COALESCE(
          (
            SELECT array_agg(pc.hy_course_id)
            FROM prerequisite_courses pr
            JOIN courses pc ON pr.prerequisite_course_id = pc.id
            WHERE pr.course_id = c.id
          ),
          '{}'::text[]
        ) AS dependencies
      FROM course_degree_relation cdr
      JOIN courses c ON cdr.course_id = c.id
      WHERE cdr.degree_id = $1
    `;

    /*
      SELECT c.course_name AS name, c.kori_id, c.hy_course_id AS identifier, cdr.relation_type AS type,
      (
        SELECT array_agg(pc.hy_course_id)
        FROM prerequisite_courses pr
        JOIN courses pc ON pr.prerequisite_course_id = pc.id
        WHERE pr.course_id = c.id
      ) AS dependencies
      FROM course_degree_relation cdr
      JOIN courses c ON cdr.course_id = c.id
      WHERE cdr.degree_id = $1
    */

    const { rows: courses } = await pool.query(
      query2, [degreeId]
    );

    console.log(courses);
    res.json(courses);

  } catch (error) {
    console.error('Error fetching degree structure:', error.message);
    res.status(500).send('Server error');
  }
});

/*
router.get('/search_by_degree_name_old', async (req, res) => {
  const id = req.query.search; // example KH50_005
  console.log("Fetching degree with id:", id)
  try {
    const degreeStructure = await helsinkiInterface.degreeStructure(id);
    let moduleUnits = findAndFilterMandatoryModuleRules(degreeStructure)
    moduleUnits = findModulesWithCourses(moduleUnits)

    res.json(moduleUnits);
  } catch (error) {
    console.error('Error fetching degree structure:', error.message);
    res.status(500).send('Server error');
  }
});
*/
module.exports = router;
