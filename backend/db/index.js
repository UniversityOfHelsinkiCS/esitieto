require('dotenv').config();

// Leaving here if some of you need to debug something
//console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
//console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);

const { Pool } = require('pg')

//const pool = new Pool()

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

const testDatabaseConnection = async () => {
  try {
    const response = await pool.query('SELECT NOW()');
    console.log('Successful database connection. Current time from DB:', response.rows[0].now);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
};

testDatabaseConnection();



const addCourse = async (course_code, course_name, course_nick_name, kori_name) => {
  const { rows } = await pool.query(
    'INSERT INTO Courses (course_code, course_name, course_nick_name, kori_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [course_code, course_name, course_nick_name, kori_name]
  );
  return rows[0];
};

const updateCourse = async (id, course_code, course_name, course_nick_name, kori_name) => {
  const { rows } = await pool.query(
    'UPDATE Courses SET course_code = $2, course_name = $3, course_nick_name = $4, kori_name = $5 WHERE id = $1 RETURNING *',
    [id, course_code, course_name, course_nick_name, kori_name]
  );
  return rows[0];
};

const deleteCourse = async (id) => {
  await pool.query('DELETE FROM Courses WHERE id = $1', [id]);
};

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  getCourses: async () => {
    const { rows } = await pool.query('SELECT * FROM Courses');
    return rows;
  },
  addCourse,
  updateCourse,
  deleteCourse,
  endDatabase: async () => {
    await pool.end();
  },
};

/*
exports.query = (text, params, callback) => {
  return pool.query(text, params, callback)
}

export async function getCourses() {
  const { rows } = await pool.query('SELECT * FROM Courses');
  return rows;
}

export async function endDatabase() {
  await pool.end();
}
*/