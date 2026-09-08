// Import all needs
const express = require('express');
const router = express.Router();
const shipController = require('./ship-controller.js')

// Create Route get 
router.get('/ship', shipController.getAllShip);

// Export module 
module.exports = router;
