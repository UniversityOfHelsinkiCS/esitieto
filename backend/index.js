require('dotenv').config();
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./middleware/logger');


const app = express()
const PORT = 3001; //process.env.PORT || 3001; adjust port later from .env, probably using dotenv
//const { getCourses } = require('./database.js');
const { getCourses } = require('./db');
const { executeSchemaFile } = require('./dbStartup');
const { insertDataFromJson } = require('./dbStartup/insertDataFromJson');
const coursesRoutes = require('./routes/coursesRoutes');
const degreesRoutes = require('./routes/degreesRoutes');
const koriRoutes = require('./routes/koriRoutes');
const loginRoutes = require('./routes/loginRoutes');
const userMiddleware = require('./middleware/user');

app.use(express.static('./dist'));
executeSchemaFile();
insertDataFromJson();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(userMiddleware)

app.get('/api/getCourses', async (req, res) => {
  try {
    const courses = await getCourses();
    logger.verbose("Courses from database",courses)
    res.json(courses);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
});

app.get('*', (req, res) => res.sendFile(path.join('./dist', 'index.html')))

app.use('/api/courses', coursesRoutes);
app.use('/api/degrees', degreesRoutes);
app.use('/api/kori', koriRoutes);
app.use('/api/kirjauduttu', loginRoutes);

app.use((req, res) => {
  logger.warn(`Attempted access an undefined route: ${req.originalUrl}`);
  res.status(404).send('Route does not exist.');
});

app.listen(PORT, () => {
  logger.verbose(`Server running on port ${PORT}`);
});

module.exports = app;
