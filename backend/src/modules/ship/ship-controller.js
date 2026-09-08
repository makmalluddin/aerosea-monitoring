// Import all needs 
const Ship = require('./Ship.js')

// Get all ship data 
const getAllShip = async (req, res) => {
  try {
    const shipData = await Ship.find();

    // Send response 
    res.json({
      total: shipData.length,
      data: shipData
    })
  } catch (error) {
    console.error('Gagal mengambil data kapal');
  }
};

module.exports = { getAllShip };
