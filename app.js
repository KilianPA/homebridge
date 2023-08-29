const express = require('express');
const W3CWebSocket = require('websocket').w3cwebsocket;
const WebSocketAsPromised = require('websocket-as-promised');

const wsp = new WebSocketAsPromised('ws://localhost:8081', {
  createWebSocket: (url) => new W3CWebSocket(url),
});
const Accessory = require('./models/accessory');
const app = express();
const port = 3000;

app.get('/accessories/:id/status', async (req, res) => {
  const { id } = req.params;
  const accessory = await Accessory.factory(id);
  console.log('Call get accessory', accessory.name, accessory.status);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: accessory.status }));
});

app.get('/accessories/:id/turn/:status', async (req, res) => {
  const { id, status } = req.params;
  const accessory = await Accessory.factory(id);
  console.log('Call turn accessory', accessory.name, status);
  await accessory.update({ status: status === 'on' ? 1 : 0 });
  await accessory.refresh();
  res.setHeader('Content-Type', 'application/json');
  console.log('Accessory', accessory.name, accessory.status);
  await sendWebsocketData(JSON.stringify({ status: accessory.status }));
  res.end(JSON.stringify({ status: accessory.status }));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const sendWebsocketData = async (data) => {
  await wsp.open();
  await wsp.send(data);
  await wsp.close();
};
