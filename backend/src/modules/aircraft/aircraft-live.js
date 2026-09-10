// Import all needs
const axios = require('axios');
const { getToken } = require('/home/makmalluddin/Projects/aerosea-monitoring/backend/src/utils/token-manager.js');

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
    const nowAircraft = response.data;
    console.log(nowAircraft);

    return nowAircraft;
  }

  catch (error) {
    console.log('Gagal Fetch Data: ', error.message);
  }
}

fetchData();
// Function cleaning data 
// Function fetch data 
// Start function 
