const express = require('express');
const router = express.Router();
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