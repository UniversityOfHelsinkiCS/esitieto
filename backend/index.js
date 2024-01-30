const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001; //process.env.PORT || 3001; adjust port later from .env, probably using dotenv

app.use(cors());
app.use(express.json());

app.get('/api/courses', (request, response) => {
  response.json(courses);
})

app.post('/api/courses/add', (req, res) => {
  console.log("Adding course: ",req.body);
  const { name, identifier, dependencies, type } = req.body;
  courses.push({ name, identifier, dependencies, type });

  res.status(200).send('Course added successfully');
});

app.delete('/api/courses/remove', (req, res) => {
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

app.get('/api/courses/search', (req, res) => {
  const searchTerm = req.query.term;
  console.log("Searching course: ",searchTerm);

  const filteredCourses = courses.filter(course => course.name.includes(searchTerm) || course.identifier.includes(searchTerm));
  res.json(filteredCourses);
});



app.use((req, res) => {
  console.log("Attempted access an undefined route: ", req.originalUrl);
  res.status(404).send('Route does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
