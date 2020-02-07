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
};
createPool();

var test = function(req, res) {
  pool.getConnection(function(err, conn){
      conn.query("select * from Recipes", function(err, rows) {
           res.json(rows);
      })
  })
}



app.get('/', (req, res) => {
  res.status(200).send('Bonjour').end();
});

module.exports = app