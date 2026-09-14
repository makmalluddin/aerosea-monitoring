// Import all needs
require('dotenv').config();
const WebSocket = require('ws')
const API_KEY = process.env.AISSTREAM_API_KEY;
const { shipFormatter } = require('../../utils/formatter-ship.js')

// Indonesia Boundaries 
const areaIdn = [[
  [-10.171, 95.316],
  [5.889, 140.718]
]];

// Temporary Data 
const temporaryData = new Map();

// Function to handle data
const shipLive = () => {

  // Declare websocket
  const ws = new WebSocket("wss://stream.aisstream.io/v0/stream", {
    perMessageDeflate: true
  });

  // Connect to Aisstream
  ws.on("open", () => ws.send(JSON.stringify({
    APIKey: API_KEY,
    BoundingBoxes: areaIdn,
    FilterMessageTypes: ["PositionReport"]
  })));

  // Get message 
  ws.on("message", (data) => {
    jsonData = JSON.parse(data.toString());

    // Pass another MessageType 
    if (jsonData.MessageType != "PositionReport") {
      return;
    };

    // Format & save data to temporaryData
    cleanData = shipFormatter(jsonData);
    temporaryData.set(cleanData.mmsi, cleanData);
  });

  // Get error 
  ws.on("error", (error) => {
    console.error("Error jaringan: ", error.message);
  });

  // Get message close and reconnect 
  ws.on("close", (code, reason) => {
    console.log(`Koneksi diputus, kode: ${code}`);
    console.log(`Alasan: ${reason.toString()}`);

    // Reconnect again 
    setTimeout(() => {
      shipLive();
    }, 5000);
  });
};

const aisService = (io) => {
  // Run socket
  shipLive();
  setInterval(() => {
    if (temporaryData.size > 0) {

      // Send data with socket.io 
      io.emit('ship-pipe', Array.from(temporaryData.values()));
      temporaryData.clear();

    }
  }, 2000)
};

// Export modules
module.exports = { aisService };
