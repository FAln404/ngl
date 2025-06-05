const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/send', (req, res) => {
  const message = req.body.message;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'];

  const data = {
    message,
    ip,
    userAgent: ua,
    timestamp: new Date().toISOString()
  };

  // Simpan ke file messages.json
  fs.readFile('messages.json', (err, content) => {
    let msgs = [];
    if (!err) msgs = JSON.parse(content);
    msgs.push(data);
    fs.writeFile('messages.json', JSON.stringify(msgs, null, 2), () => {
      res.status(200).send("ok");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:$3000`);
});
