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
      const courseUnitRules = findMandatoryCourseUnitRules(degreeStructure)

      res.json(courseUnitRules);
  } catch (error) {
      console.error('Error fetching degree structure:', error.message);
      res.status(500).send('Server error');
  }
});


// Finds ALL courses including numerous optional courses that are part of any module. I do not recommend using this, but leaving just in case!
function findAllCourseUnitRules(obj, results = []) {
  if (obj !== null && typeof obj === 'object') {
      if (obj.type === 'CourseUnitRule') {
          results.push(obj);
      }

      Object.values(obj).forEach(value => {
          findAllCourseUnitRules(value, results);
      });
  }

  return results;
}

// Finds only those courses that belong to module where all courses are mandatory.
function findMandatoryCourseUnitRules(obj, isWithinRequiredModule = false, results = []) {
  if (obj !== null && typeof obj === 'object') {
      if (obj.type === 'ModuleRule' && obj.dataNode?.rule?.allMandatory) {
          isWithinRequiredModule = true;
      }

      if (obj.type === 'CourseUnitRule' && isWithinRequiredModule) {
          results.push(obj);
      }

      Object.values(obj).forEach(value => {
          if (typeof value === 'object') {
              const newContext = obj.type === 'ModuleRule' && !obj.dataNode?.rule?.allMandatory
                                 ? false : isWithinRequiredModule;
              findMandatoryCourseUnitRules(value, newContext, results);
          }
      });
  }

  return results;
}


module.exports = router;
