// Controller for aircraft 
const Aircraft = require('./Aircraft.js')

// Get data for aircraft 
const getAllAircraft = async (req, res) => {
  try {
    const aircraftData = await Aircraft.find();

    res.json({
      jumlah: aircraftData.length,
      data: aircraftData
    })
  } catch (error) {
    console.error('Tidak dapat mengambil data kapal')
  }
};

module.exports = { getAllAircraft };
