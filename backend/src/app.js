// basic app

const express = require('express');
const app = express();

// routing basic
app.get('/', (req, res) => {
  res.send('ini adalah routing root');
})

app.get('/kapal', (req, res) => {
  res.send('ini adalah routing /kapal')
});

// export modules
module.exports = app;
