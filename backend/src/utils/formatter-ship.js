// Import all needs 

// Funtion formatter
const shipFormatter = (rawShip) => {
  return rawShip.map((Ship) => {
    return {
      mmsi: Ship[1][0],
      shipname: Ship[1][1],
      longitude: Ship[1][2],
      latitude: Ship[1][3],
    }
  });
};

// Export module 
module.exports = { shipFormatter };
