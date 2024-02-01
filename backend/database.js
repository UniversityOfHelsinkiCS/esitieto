import { Client } from 'pg'

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