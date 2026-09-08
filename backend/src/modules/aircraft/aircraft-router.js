// Import all needs 
const express = require('express');
const router = express.Router();
const aircraftController = require('./aircraft-controller.js')

// Create route 
router.get('/', aircraftController.getAllAircraft);

// Export router 
module.exports = router;
