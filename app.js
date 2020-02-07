const express = require('express');
//var mysql = require('mysql');

const app = express();
/*
var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database:""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/

app.get('/', (req, res) => {
  res.status(200).send('Bonjour').end();
});

module.exports = app