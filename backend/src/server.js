// main app server 
const server = require('./app.js');
const mongoose = require('mongoose');
const seedData = require('./shared/seeder/seeder.js')

// untuk kerapian
const port = 5000
const URL_DB = 'mongodb://mongodb:27017/aerosea_db'

// main function 
const startServer = async () => {
  try {
    // connect to database first 
    await mongoose.connect(URL_DB);
    console.log('Connection to MongoDB success');

    // run seedData module 
    await seedData();

    // activate app 
    server.listen(port, '0.0.0.0', () => {
      console.log('App Starting')
    })
  }

  catch (error) {
    console.error('Failed to start Apps', error)
  }
}

startServer();
