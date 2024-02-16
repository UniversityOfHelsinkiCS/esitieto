const express = require('express');
const router = express.Router();
const KoriInterface = require('../interfaces/koriInterface');
const kori = new KoriInterface();

router.get('/search_by_name', async (req, res) => {
    try {
      const search = req.query.search;
      const response = await kori.searchCourses(search);
      console.log("Courses from Kori", response);
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      const exactMatch = response.searchResults.find(course => course.name === search);
      if (exactMatch) {
          res.json([exactMatch]);
      } else {
          res.json(response.searchResults);
      }
  
      console.log("KORI Results from search term:",search)
    } catch (err) {
      console.error("Error accessing Kori API:", err);
      res.status(500).send('Server error');
    }
});

router.get('/get_info_by_name', async (req, res) => {
    try {
        const search = req.query.search;
        const response = await kori.courseInfo(search);
        console.log("Courses from Kori", response);
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log("fetching course info with name", search);

        res.json(response);
    } catch (err) {
        console.error("Error accessing Kori API:", err);
        res.status(500).send('Server error');
    }
});

// Temporary function for testing out that the KORI API, to be removed later!

router.get('/getKori', async (req, res) => {
    try {
      const search = req.query.search;
      const courses = await kori.searchCourses(search);
      console.log("Courses from Kori", courses);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.json(courses);
  
      //res.setHeader('Content-Type', 'application/json');
      //res.send(JSON.stringify(courses, null, 2));
      console.log("KORI Results from search term:",search)
    } catch (err) {
      console.error("Error accessing Kori API:", err);
      res.status(500).send('Server error');
    }
});


module.exports = router;