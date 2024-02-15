const express = require('express');
const router = express.Router();
const HelsinkiInterface = require('../interfaces/helsinkiInterface');
const helsinkiInterface = new HelsinkiInterface();

// Sample data. Will later include the courses that are part of the degree
const degrees = [
  { degree_name: 'TKT 20-23' },
  { degree_name: 'TKT 23-26' },
];

router.get('/', (request, response) => {
  response.json(degrees);
});

router.get('/search_by_degree_name', async (req, res) => {
  const id = req.query.search; // example KH50_005
  console.log("Fetching degree with id:",id)
  try {
      const degreeStructure = await helsinkiInterface.degreeStructure(id);
      const courseUnitRules = findAllCourseUnitRules(degreeStructure)

      res.json(courseUnitRules);
  } catch (error) {
      console.error('Error fetching degree structure:', error.message);
      res.status(500).send('Server error');
  }
});



function findAllCourseUnitRules(obj, results = []) {
  // Check if obj is an object or an array to iterate over its properties
  if (obj !== null && typeof obj === 'object') {
      // If the current object is the one we're looking for, add it to the results array
      if (obj.type === 'CourseUnitRule') {
          results.push(obj);
      }

      // Iterate over all properties of the object or elements of the array
      Object.values(obj).forEach(value => {
          // Recursively search for CourseUnitRule objects
          findAllCourseUnitRules(value, results);
      });
  }

  return results;
}

module.exports = router;
