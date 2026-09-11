// Import all needs
require('dotenv').config();
const WebSocket = require('ws')
const API_KEY = process.env.AISSTREAM_API_KEY;

// Important variable
const ws = new WebSocket("wss://stream.aisstream.io/v0/stream");
const areaIdn = [[
  [-10.171, 95.316],
  [5.889, 140.718]
]];

// Connect to Aisstream
ws.on("open", () => ws.send(JSON.stringify({
  APIKey: API_KEY,
  BoundingBoxes: [[[-10, 95], [5, 141]]],
  FilterMessageTypes: ["PositionReport"]
})));

// Get data 
ws.on("message", data => console.log(JSON.parse(data.toString())));
// 

// Menangkap pesan error jaringan
ws.on("error", (error) => {
  console.error("Error jaringan: ", error.message);
});

// Menangkap kode alasan mengapa Aisstream memutus koneksi
ws.on("close", (code, reason) => {
  console.log(`Koneksi diputus. Kode: ${code}`);
  console.log(`Alasan: ${reason.toString() || "Tidak ada alasan (Silent Drop)"}`);
});
// Connect to Aisstream.io 
// Export modules 
