const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const logger = require('../middleware/logger');
const { addManyCourses, addManyPrequisiteCourses } = require('../db');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function mapPrerequisistes(jsonData) {
  let courseMappings = [];

  jsonData.courses.forEach(course => {
      course.prerequisiteCourses.forEach(prerequisiteCourse => {
          courseMappings.push({
              course: course.courseCode,
              prerequisiteCourse: prerequisiteCourse, 
              relationType: course.courseType || 'compulsory' // Include relation type if available, otherwise 'compulsory'
          });
      });
  });
  return courseMappings;
}

const insertDataFromJson = async () => {
  /*
  Loads data from degreeToDb.json and inserts it into the database.
  */
  try {
    const dataPath = path.join(__dirname, 'degreeToDb.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    const courseCodes = jsonData.courses.map(course => (course.courseCode));
    const courseMappings = mapPrerequisistes(jsonData);

    await addManyCourses(courseCodes); 
    await addManyPrequisiteCourses(courseMappings);

  } catch (err) {
    console.error('Error inserting data:', err);
  }
};

module.exports = {
  insertDataFromJson,
};
