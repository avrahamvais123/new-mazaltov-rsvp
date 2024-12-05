const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8081 });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = { broadcast };
