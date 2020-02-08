const express = require('express');
var mysql = require('mysql');
var app = express();


var pool = mysql.createPool({
  connectionLimit : 10, //important
  user: process.env.DB_USER, // e.g. 'my-db-user'
  password: process.env.DB_PASS, // e.g. 'my-db-password'
  database: process.env.DB_NAME, // e.g. 'my-database'
  socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
  debug    :  false
});

function handle_database(req,res) {
  pool.getConnection(function(err,connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }  

      console.log('connected as id ' + connection.threadId);
     
      connection.query("select * from Recipes",function(err,rows){
          connection.release();
          if(!err) {
              res.json(rows);
          }          
      });

      connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;    
      });
});
}

/*

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

*/




app.get('/', (req, res) => {
  handle_database(req,res);
  res.status(200).send('Bonjour').end();
});

module.exports = app