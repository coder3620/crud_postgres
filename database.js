const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'demo',
  password: 'root',
  port: 5432,
});

module.exports = pool;
