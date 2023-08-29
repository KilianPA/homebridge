const ws = require('ws');
const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
    // Send the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});
