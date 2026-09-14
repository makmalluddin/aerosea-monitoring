// Import all needs
const axios = require('axios');
const { getToken } = require('../../utils/token-manager.js');
const { aircraftFormatter } = require('../../utils/formatter-aircraft.js');

// Function to fetch data  
const fetchData = async () => {
  try {
    const activeToken = await getToken();

    // Parameter for Indonesia area 
    const areaIdn = {
      lamin: -10.171,
      lamax: 5.889,
      lomin: 95.316,
      lomax: 140.718,
    };

    // Fetch data 
    const response = await axios.get("https://opensky-network.org/api/states/all", {
      headers: {
        "Authorization": `Bearer ${activeToken}`
      },
      params: areaIdn
    });

    // Aircraft data 
    const nowAircraft = response.data.states;
    const cleanData = aircraftFormatter(nowAircraft);

    return cleanData;
  }

  catch (error) {
    console.log('Gagal Fetch Data: ', error.message);
  }
}

// Function to streaming data in socket.io 
const airService = (io) => {
  setInterval(async () => {
    // Fetch and send data with socket.io
    const getData = await fetchData();
    io.emit('aircraft-pipe', getData);
  }, 10000)
}

// Export module function 
module.exports = { airService };
