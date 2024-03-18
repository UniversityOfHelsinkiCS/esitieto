const express = require('express');
const router = express.Router();
const { getCourses, addCourse, deleteCourse, updateCourse,
  addPrerequisiteCourse, removePrerequisiteCourse,
  fetchCourseWithPrerequisites,
  getAllCoursesWithPrerequisites } = require('../db');
const logger = require('../middleware/logger');


// TO BE DEPRECATED
router.get('/', (request, response) => {
    response.json(courses);
})

const findCourseWithDependencies = (identifier, allCourses) => {
  const course = allCourses.find(course => course.identifier === identifier);
  if (!course) return [];

  let courses = [course];
  course.dependencies.forEach(dep => {
      courses = [...courses, ...findCourseWithDependencies(dep, allCourses)];
  });

  return courses;
};

// Database routes for getting courses, not to be integrated with the system until database is set

function asyncHandler(fn) {
  return async function(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
}

router.get('/databaseGetCourses', asyncHandler(async (req, res) => {
  const courses = await getCourses();
  logger.debug("Courses from database", courses);
  res.json(courses);
}));

router.post('/databaseCreateCourse', asyncHandler(async (req, res) => {
  logger.debug("Received request body:", req.body);
  const { official_course_id, course_name, kori_name } = req.body;
  const newCourse = await addCourse(official_course_id, course_name, kori_name);
  logger.debug("Adding course", newCourse);
  res.json(newCourse);
}));

router.delete('/databaseDeleteCourse/:kori_name', asyncHandler(async (req, res) => {
  const { kori_name } = req.params;
  const rowsDeleted = await deleteCourse(kori_name);
  
  if (rowsDeleted > 0) {
    res.send({ message: 'Course deleted successfully' });
  } else {
    res.status(404).send({ message: 'Course not found or could not be deleted' });
  }
}));

router.put('/databaseUpdateCourse/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { official_course_id, course_name, kori_name } = req.body;
  const updatedCourse = await updateCourse(id, official_course_id, course_name, kori_name);
  res.json(updatedCourse);
}));

// Add dependencies

router.post('/addPrerequisiteCourse', asyncHandler(async (req, res) => {
  const { course_kori_name, prerequisite_course_kori_name } = req.body;
  const newPrerequisite = await addPrerequisiteCourse(course_kori_name, prerequisite_course_kori_name);
  logger.debug("Added new prerequisite course relation", newPrerequisite);
  res.json(newPrerequisite);
}));

router.delete('/removePrerequisiteCourse', asyncHandler(async (req, res) => {
  const { course_hy_id, prerequisite_course_hy_id } = req.body;
  await removePrerequisiteCourse(course_hy_id, prerequisite_course_hy_id);
  res.send({ message: 'Prerequisite course relation removed successfully' });
}));

// Fetch based on dependencies

router.get('/getCourseWithPrerequisites/:course_kori_name', asyncHandler(async (req, res) => {
  const { course_kori_name } = req.params;
  const courseGraph = await fetchCourseWithPrerequisites(course_kori_name);

  if (courseGraph) {
    logger.debug("Course and its prerequisites:", courseGraph);
    res.json(courseGraph);
  } else {
    res.status(404).send({ message: 'Course not found or it has no prerequisites.' });
  }
}));



// --------------- FOR TESTING ONLY ----------------

router.get('/getAllCoursesWithPrerequisites', asyncHandler(async (req, res) => {
  const allCoursesWithPrerequisites = await getAllCoursesWithPrerequisites();
  res.json(allCoursesWithPrerequisites);
}));


// Sample course data, to be removed later once connection to database is done!
const courses = [
  { name: 'Tietorakenteet ja algoritmit II', identifier: 'Tira2', dependencies: ['Tira1'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Tietorakenteet ja algoritmit I', identifier: 'Tira1', dependencies: ['Ohja', 'Jym'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Introduction to AI', identifier: 'IntroAI', dependencies: ['TodNak1', 'Tira2'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Todennäköisyyslaskenta I', identifier: 'TodNak1', dependencies: [], type: 'optional', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Todennäköisyyslaskenta II', identifier: 'TodNak2', dependencies: ['TodNak1'], type: 'optional', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Ohjelmistotuotanto Projekti', identifier: 'Ohtupro', dependencies: ['Ohtu', 'aine-ai', 'aine-tl', 'aine-ot'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Ohjelmistotuotanto', identifier: 'Ohtu', dependencies: ['TikaWeb'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Tietokannat ja Web-ohjelmointi', identifier: 'TikaWeb', dependencies: ['Ohja'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Ohjelmoinnin peruskurssi', identifier: 'Ohpe', dependencies: [], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Ohjelmoinnin jatkokurssi', identifier: 'Ohja', dependencies: ['Ohpe'], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Johdatus Yliopistomatematiikkaan', identifier: 'Jym', dependencies: [], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Aineopintojen harjoitustyö: Algoritmit ja tekoäly', identifier: 'aine-ai', dependencies: ['Tira2'], type: 'alternative', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Aineopintojen harjoitustyö: Tietoliikenne', identifier: 'aine-tl', dependencies: ['Coin'], type: 'alternative', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Aineopintojen harjoitustyö: Ohjelmistotekniikka', identifier: 'aine-ot', dependencies: ['Ohja', 'Tikape', 'TikaWeb'], type: 'alternative', description: 'Tämä on backendistä haettu kurssin kuvaus' },
  { name: 'Computer and Internet', identifier: 'Coin', dependencies: [], type: 'mandatory', description: 'Tämä on backendistä haettu kurssin kuvaus' },
];
  
  module.exports = router;
  module.exports.findCourseWithDependencies = findCourseWithDependencies;