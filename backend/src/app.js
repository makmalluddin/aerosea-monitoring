// Import all needs 
const express = require('express');
const cors = require('cors');
const routeaircraft = require('./modules/aircraft/aircraft-router.js')
const routeship = require('./modules/ship/ship-router.js')

// Express app 
const app = express();

// Middleware
app.use(cors({
  origin: ['http:/localhost:5173', 'http:/localhost:3000'],
  methods: ['GET'],
}));
app.use(express.json());

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
