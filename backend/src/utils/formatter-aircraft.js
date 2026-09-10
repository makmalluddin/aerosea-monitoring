// Function formatter data
const formatter = (rawData) => {
  return rawData.map((aircraft, index) => {
    return {
      callsign: (aircraft[1]).trim(),
      icao24: aircraft[0],
      origin_country: aircraft[2],
      last_contact: aircraft[4],
      geo_altitude: aircraft[13],
      vertical_rate: aircraft[11],
      heading: aircraft[10],
      velocity: aircraft[9],
      longitude: aircraft[5],
      latitude: aircraft[6],
    }
  });
}

module.exports = { formatter };
