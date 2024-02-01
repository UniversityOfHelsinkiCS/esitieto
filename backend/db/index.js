const { Pool } = require('pg')

const pool = new Pool()

exports.query = (text, params, callback) => {
  return pool.query(text, params, callback)
}