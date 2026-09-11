// Funtion formatter
const shipFormatter = (rawShip) => {
  return rawShip.map((Ship, index) => {
    return {
      mmsi: Ship.Metadata.MMSI,
      shipname: Ship.MetaData.ShipName,
      longitude: Ship.MetaData.Longitude,
      latitude: Ship.MetaData.Latitude,
      cog: Ship.Message.Cog,
      heading: Ship.Message.TrueHeading,
      sog: Ship.Message.Sog,
    }
  });
};

// Export module 
module.exports = { shipFormatter };
