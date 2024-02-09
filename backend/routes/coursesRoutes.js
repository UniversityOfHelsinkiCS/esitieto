const express = require('express');
const router = express.Router();
const { getCourses, addCourse, deleteCourse, updateCourse } = require('../db');
const KoriInterface = require('../interfaces/koriInterface');
const kori = new KoriInterface();

router.get('/', (request, response) => {
    response.json(courses);
})
  
router.post('/add', (req, res) => {
  console.log("Adding course: ",req.body);
  const { name, identifier, dependencies, type } = req.body;
  courses.push({ name, identifier, dependencies, type });

  res.status(200).send('Course added successfully');
});
  
router.delete('/remove', (req, res) => {
  console.log("Removing course: ",req.body);
  const { identifier } = req.body;
  const index = courses.findIndex(course => course.identifier === identifier);
  if (index > -1) {
      courses.splice(index, 1);
      res.status(200).send('Course removed successfully');
  } else {
      res.status(404).send('Course not found');
  }
});

router.get('/search', (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  console.log("Searching course: ", searchTerm);

  const matchedCourses = courses.filter(course => 
      course.name.toLowerCase() === searchTerm || 
      course.identifier.toLowerCase() === searchTerm
  );

  let result = [];
  matchedCourses.forEach(course => {
      const courseDependencies = findCourseWithDependencies(course.identifier, courses);
      result = [...result, ...courseDependencies];
  });

  const uniqueResult = Array.from(new Set(result.map(c => c.identifier)))
      .map(id => {
          return result.find(c => c.identifier === id);
      });

  res.json(uniqueResult);
});

router.get('/searchname', async (req, res) => {
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

router.get('/databaseGetCourses', async (req, res) => {
  try {
    const courses = await getCourses();
    console.log("Courses from database",courses)
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.post('/databaseCreateCourse', async (req, res) => {
  console.log("Received request body:", req.body);
  const { course_code, course_name, course_nick_name, kori_name } = req.body;
  try {
    const newCourse = await addCourse(course_code, course_name, course_nick_name, kori_name);
    console.log("Adding course",newCourse);
    res.json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.delete('/databaseDeleteCourse/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCourse(id);
    res.send({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.put('/databaseUpdateCourse/:id', async (req, res) => {
  const { id } = req.params;
  const { course_code, course_name, course_nick_name, kori_name } = req.body;
  try {
    const updatedCourse = await updateCourse(id, course_code, course_name, course_nick_name, kori_name);
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

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