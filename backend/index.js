require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001; //process.env.PORT || 3001; adjust port later from .env, probably using dotenv
//const { getCourses } = require('./database.js');
const { getCourses } = require('./db');

const KoriInterface = require('./interfaces/koriInterface');
const kori = new KoriInterface();

const coursesRoutes = require('./routes/coursesRoutes');
const degreesRoutes = require('./routes/degreesRoutes');

// Temporary function for testing out that the KORI API, to be removed later!
app.get('/api/getKori', async (req, res) => {
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

// Temporary function for testing out that the database should work, to be removed later!
app.get('/api/getCourses', async (req, res) => {
  try {
    const courses = await getCourses();
    console.log("Courses from database",courses)
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/courses', coursesRoutes);
app.use('/api/degrees', degreesRoutes);

app.use((req, res) => {
  console.log("Attempted access an undefined route: ", req.originalUrl);
  res.status(404).send('Route does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


