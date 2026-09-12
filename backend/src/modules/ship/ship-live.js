// Import all needs
require('dotenv').config();
const WebSocket = require('ws')
const API_KEY = process.env.AISSTREAM_API_KEY;
const { shipFormatter } = require('/home/makmalluddin/Projects/aerosea-monitoring/backend/src/utils/formatter-ship.js')

// Important variable
const ws = new WebSocket("wss://stream.aisstream.io/v0/stream", {
  perMessageDeflate: true
});
const areaIdn = [[
  [-10.171, 95.316],
  [5.889, 140.718]
]];

// Temporary Data 
const temporaryData = new Map();

// Connect to Aisstream
ws.on("open", () => ws.send(JSON.stringify({
  APIKey: API_KEY,
  BoundingBoxes: areaIdn,
  FilterMessageTypes: ["PositionReport"]
})));

// Get data 
// ws.on("message", data => console.log(JSON.parse(data)));
ws.on("message", (data) => {
  jsonData = JSON.parse(data.toString());

  // Pass another MessageType 
  if (jsonData.MessageType != "PositionReport") {
    return;
  };

  // Format & save data to temporaryData
  cleanData = shipFormatter(jsonData);
  temporaryData.set(cleanData.mmsi, cleanData);

  console.log(temporaryData);
});

// Get error 
ws.on("error", (error) => {
  console.error("Error jaringan: ", error.message);
});

// Get message close and reconnect 
ws.on("close", (code, reason) => {
  console.log(`Koneksi diputus, kode: ${code}`);
  console.log(`Alasan: ${reason.toString()}`);
});

// Export modules 
