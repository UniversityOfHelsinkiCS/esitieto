const express = require('express');
const router = express.Router();
const { findAndFilterMandatoryModuleRules, findModulesWithCourses } = require('../utils/helsinkiFilters');
const HelsinkiInterface = require('../interfaces/helsinkiInterface');
const helsinkiInterface = new HelsinkiInterface();
const { pool } = require('../dbStartup');
const logger = require('../middleware/logger');


//const result = await pool.query('SELECT * FROM degrees');

// Sample data. Will later include the courses that are part of the degree
const degrees = [
  { degree_name: 'TKT 20-23' },
  { degree_name: 'TKT 23-26' },
];

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM degrees');
    const degrees = result.rows.map(degree => ({ degree_name: degree.degree_name }));
    logger.debug("Degrees fetched:",degrees);
    res.json(degrees);
  } catch (error) {
      logger.error(`Error fetching degrees: ${error.message}`);
      res.status(500).send('Server error');
  }
});

router.get('/search_by_degree_name', async (req, res) => {
  const id = req.query.search; // example KH50_005
  console.log("Fetching degree with id:",id)
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

module.exports = router;
