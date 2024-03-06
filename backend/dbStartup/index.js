require('dotenv').config();

// Leaving here if some of you need to debug something
//console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
//console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);


const { Pool } = require('pg')

const selectPool = () => {
  if (process.env.DATABASE_POOLMODE === "direct") {
    console.log("Using direct DATABASE_POOLMODE")
    return new Pool({
      connectionString: process.env.DATABASE_DIRECT
    });
  } else {
    console.log("Using default DATABASE_POOLMODE")
    return new Pool({
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    });
  }
};

const pool = selectPool();

const executeSchemaFile = async () => {
  const fs = require('fs');
  const path = require('path');
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  await pool.query(schema);
  console.log('Schema file executed');
};

module.exports = {
  executeSchemaFile,
};
