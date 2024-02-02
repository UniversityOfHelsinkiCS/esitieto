const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001; //process.env.PORT || 3001; adjust port later from .env, probably using dotenv

const coursesRoutes = require('./routes/coursesRoutes');
const degreesRoutes = require('./routes/degreesRoutes');

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


