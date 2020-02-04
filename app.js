const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Salut').end();
});

module.exports = app