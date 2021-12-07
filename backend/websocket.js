const express = require('express');

const router = express.Router();

let value = 0;

router.ws('/set-value', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(`Received: ${msg}`);
    request = JSON.parse(msg);
    if (request.action == 'set-value') {
      value = request.data.value;
      ws.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({action: 'set-value', data: value}));
        }
      });
    }
  });
});

module.exports = router;
