require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001; //process.env.PORT || 3001; adjust port later from .env, probably using dotenv
//const { getCourses } = require('./database.js');
const { getCourses } = require('./db');
const { executeSchemaFile } = require('./dbStartup');
const coursesRoutes = require('./routes/coursesRoutes');
const degreesRoutes = require('./routes/degreesRoutes');
const koriRoutes = require('./routes/koriRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userMiddleware = require('./middleware/user');

app.use(express.static('./dist'));
executeSchemaFile();

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
app.use(userMiddleware)
app.use('/api/courses', coursesRoutes);
app.use('/api/degrees', degreesRoutes);
app.use('/api/kori', koriRoutes);
app.use('/kirjauduttu', loginRoutes);

app.use((req, res) => {
  console.log("Attempted access an undefined route: ", req.originalUrl);
  res.status(404).send('Route does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


