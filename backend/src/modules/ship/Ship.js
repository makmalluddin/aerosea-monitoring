// Schema Kapal
const mongoose = require('mongoose');

const kapalSchema = new mongoose.Schema({
  mmsi: { type: Number, required: true },
  speed: { type: Number },
  course: { type: Number },
  heading: { type: Number },
  longitude: { type: Number },
  latitude: { type: Number },
});

const Ship = mongoose.model('Ship', kapalSchema);
module.exports = Ship
