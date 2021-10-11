const express = require('express');
const app = express();
const port = 3001;

app.get('/get-message', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})