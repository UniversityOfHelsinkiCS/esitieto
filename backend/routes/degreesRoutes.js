const express = require('express');
const router = express.Router();

// Sample data. Will later include the courses that are part of the degree
const degrees = [
  { degree_name: 'TKT 20-23' },
  { degree_name: 'TKT 23-26' },
];

router.get('/', (request, response) => {
  response.json(degrees);
});

module.exports = router;
