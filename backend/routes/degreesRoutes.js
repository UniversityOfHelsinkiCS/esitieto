const express = require('express');
const router = express.Router();
const { pool } = require('../dbStartup');
const logger = require('../middleware/logger');


router.get('/', async (req, res) => {
  /*
  Fetches all degrees from the database and returns them as a JSON array.
  */
  try {
    const result = await pool.query('SELECT * FROM degrees');
    const degrees = result.rows.map(degree => ({ 
      degree_name: degree.degree_name, 
      degree_years: degree.degree_years,
      hy_degree_id: degree.hy_degree_id
    }));
    logger.verbose("Degrees fetched:", degrees);
    res.json(degrees);
  } catch (error) {
    logger.error(`Error fetching degrees: ${error.message}`);
    res.status(500).send('Server error');
  }
});

router.get('/search_by_degree', async (req, res) => {
  /*
  Fetches the degree structure from the database using the degree HY degree code and year.
  */

  const degreeName = req.headers['degree-id'].toLowerCase();
  const degreeYears = req.headers['degree-years'];
  logger.info(`Fetching degree with name: ${degreeName} and year: ${degreeYears}`);

  try {
    const query = `SELECT id FROM degrees WHERE hy_degree_id = $1 AND degree_years = $2`;
    const { rows } = await pool.query(
      query, [degreeName, degreeYears]
    );

    let degreeId = rows[0].id;
    const query2 = `
      SELECT 
        c.course_name AS name, 
        c.kori_id, 
        c.hy_course_id AS identifier, 
        cdr.relation_type AS type,
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

    const { rows: courses } = await pool.query(
      query2, [degreeId]
    );

    logger.verbose(courses);
    res.json(courses);

  } catch (error) {
    console.error('Error fetching degree structure:', error.message);
    res.status(500).send('Server error');
  }
});

router.post('/save_positions', async (req, res) => {
  try {
      const degreeQuery = `
          SELECT id 
          FROM degrees 
          WHERE hy_degree_id = $1 AND degree_years = $2`;

      const { rows: degreeRows } = await pool.query(degreeQuery, [req.body.degreeId, req.body.degreeYears]);

      if (degreeRows.length === 0) {
          return res.status(404).send('Degree not found');
      }

      await pool.query('DELETE FROM course_positions WHERE degree_id = $1', [degreeRows[0].id]);
      const positions = req.body.coursePositions;

      const courseIds = req.body.coursePositions.map(course => course.id);
      const courseQuery = `
          SELECT id, hy_course_id
          FROM courses
          WHERE hy_course_id = ANY($1)`;

      const { rows: courseRows } = await pool.query(courseQuery, [courseIds]);

      if (courseRows.length !== positions.length) {
          return res.status(404).send('One or more courses not found');
      }

      let insertValues = '';
      positions.forEach(position => {
          const matchingCourse = courseRows.find(course => course.hy_course_id === position.id);
          if (matchingCourse) {
              insertValues += `(${degreeRows[0].id}, ${matchingCourse.id}, ${position.position.x}, ${position.position.y}), `;
          }
      });

      insertValues = insertValues.slice(0, -2); // Remove trailing comma and space

      const insertQuery = `
          INSERT INTO course_positions(degree_id, course_id, x, y)
          VALUES ${insertValues}`;

      await pool.query(insertQuery);
      return res.status(200).send('Positions saved successfully');

  } catch (error) {
      console.error('Error saving positions:', error);
      return res.status(500).send('Internal server error');
  }
});


module.exports = router;  
