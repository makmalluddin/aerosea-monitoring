const WebSocket = require("ws");
const socket = new WebSocket("wss://stream.aisstream.io/v0/stream", {
  perMessageDeflate: true
});

socket.on("open", () => socket.send(JSON.stringify({
  APIKey: '1bb744357c19ce265af9e876433d0a6d336c19f9',
  BoundingBoxes: [[[25.835, -80.208], [25.603, -79.879]]],
  FilterMessageTypes: ["PositionReport"]
})));

socket.on("message", data => console.log(JSON.parse(data.toString())));
