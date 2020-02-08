const express = require('express');
var mysql = require('mysql');

const app = express();

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: process.env.DB_USER, // e.g. 'my-db-user'
    password: process.env.DB_PASS, // e.g. 'my-db-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
  });
  console.log(pool);
};

createPool();






app.get('/', (req, res) => {
  res.status(200).send('Bonjour').end();
});

module.exports = app