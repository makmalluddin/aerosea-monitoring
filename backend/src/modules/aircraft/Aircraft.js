// Schema Pesawat
const mongoose = require('mongoose');

const pesawatSchema = new mongoose.Schema({
  Callsign: { type: String, required: true },
  "ICAO Address": { type: String },
  Country: { type: String },
  Speed: { type: Number },
  Heading: { type: Number },
  longitude: { type: Number },
  latitude: { type: Number },
})

const Aircraft = mongoose.model('Aircraft', pesawatSchema);
module.exports = Aircraft

