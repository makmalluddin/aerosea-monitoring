// Seeder data kapal dan pesawat 
const fs = require('fs');
const Aircraft = require('../../modules/aircraft/Aircraft.js');
const Ship = require('../../modules/ship/Ship.js');
const path = require('path');

const seedData = async () => {
  try {
    // Hitung data di database dahulu
    const shipTotal = await Ship.countDocuments();
    const aircraftTotal = await Aircraft.countDocuments();

    // Path directory
    const shipDir = path.join(__dirname, './ship.json');
    const aircraftDir = path.join(__dirname, './aircraft.json');

    // Pengkondisian berdasarkan kondisi database 
    if (shipTotal === 0 && aircraftTotal === 0) {
      // Parsing data json
      const shipData = JSON.parse(fs.readFileSync(shipDir, 'utf-8'));
      const aircraftData = JSON.parse(fs.readFileSync(aircraftDir, 'utf-8'));

      // Inject data kapal dan pesawat 
      await Ship.insertMany(shipData);
      await Aircraft.insertMany(aircraftData);
      console.log('Data berhasil diinput ke database')
    }
    else {
      console.log(`Data kapal tercatat = ${shipTotal} & Data pesawat tercatat = ${aircraftTotal}`);
    }
  }

  catch (error) {
    console.error('Gagal input data ke database, ', error);

  }
}

module.exports = seedData;


