//import { Client } from 'pg'
const { Client } = require('pg');

async function StartDatabase() {
    const client = new Client()
    await client.connect()
}
 
async function PrintCourses() {
    const res = await client.query('SELECT * FROM courses')
    console.log(res)
}

async function EndDatabase() {
    await client.end()
}

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