// Funtion formatter
const shipFormatter = (rawData) => {
  return {
    mmsi: rawData.MetaData.MMSI,
    shipname: (rawData.MetaData.ShipName).trim(),
    longitude: rawData.MetaData.longitude,
    latitude: rawData.MetaData.latitude,
    cog: rawData.Message.PositionReport.Cog,
    heading: rawData.Message.PositionReport.TrueHeading,
    sog: rawData.Message.PositionReport.Sog,
  }
}

// Export module 
module.exports = { shipFormatter };
