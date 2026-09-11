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
  jsonData = JSON.parse(data);
  jsonData.map((kapal) => {
    console.log(kapal.MetaData)
  });
  // Save data to temporaryData 
  if (jsonData.MetaData && jsonData.MetaData.MMSI) {
    //cleanData = shipFormatter(jsonData);
    temporaryData.set(jsonData.MetaData.MMSI, jsonData);
  } 
  else {
    console.log('Message Default')
  };
  //console.log(temporaryData);
  // temporaryData.set(jsonData.MetaData.MMSI_String, jsonData);
});

// Get error 
ws.on("error", (error) => {
  console.error("Error jaringan: ", error.message);
});

// Get message close and reconnect 
ws.on("close", (code, reason) => {
  console.log(`Koneksi diputus. Kode: ${code}`);
  console.log(`Alasan: ${reason.toString() || "Tidak ada alasan (Silent Drop)"}`);
});
// Connect to Aisstream.io 
// Export modules 
