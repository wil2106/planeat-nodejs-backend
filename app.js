const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('marche stp').end();
});

module.exports = app