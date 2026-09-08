// Import all needs 
const express = require('express');
const routeaircraft = require('./modules/aircraft/aircraft-router.js')
const routeship = require('./modules/ship/ship-router.js')

// Express app 
const app = express();

// routing basic
app.get('/', (req, res) => {
  res.send('Root Routing');
})

// aircraft routing 
app.use('/api/aircraft', routeaircraft)

// ship routing 
app.use('/api/ship', routeship)

// export modules
module.exports = app;
