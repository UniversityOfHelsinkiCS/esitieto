const { Client } = require('pg');

async function getCourses() {
    console.log("test getCourses");
    const client = new Client();
    await client.connect();
    
    try {
        const res = await client.query('SELECT * FROM courses');
        return res.rows;
    } finally {
        await client.end();
    }
}

module.exports = { getCourses };