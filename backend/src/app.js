// Import all needs 
const express = require('express');
const cors = require('cors');
const http = require('http');

const routeaircraft = require('./modules/aircraft/aircraft-router.js')
const routeship = require('./modules/ship/ship-router.js')
const { airService } = require('./modules/aircraft/aircraft-live.js')
const { aisService } = require('./modules/ship/ship-live.js')
const { Server } = require('socket.io')

// Express app and server app 
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET'],
}));

app.use(express.json());

// Initiate socket.io 
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Listener 
io.on('connection', (socket) => {
  console.log('Client terhubung, ID :', socket.id);

  socket.on('disconnect', () => {
    console.log('Terputus Client');
  })
});

// Send data 
aisService(io);
airService(io);

// routing basic
app.get('/', (req, res) => {
  res.send('Root Routing');
});

// aircraft routing 
app.use('/api/aircraft', routeaircraft);

// ship routing 
app.use('/api/ship', routeship);

// export modules
module.exports = server;
