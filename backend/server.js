const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./logic/api')



app.use(express.json());
app.use(cors());

app.get('/get-message', (req, res) => {
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
});

app.post("/registerUser", (req, res) => {

  console.log(req.body);
  res.send("Server Message");
});


module.exports = app;