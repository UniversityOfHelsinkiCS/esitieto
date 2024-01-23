const express = require('express')
const app = express()

app.get('/api/courses', (request, response) => {
    response.json(notes)
  })