const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./logic/api');
const auth = require('./authentication.js');


app.use(express.json());
app.use(cors());

app.get('/get-message', (req, res) => {
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
});

app.post("/registerUser", (req, res) => {

  api.registerUser(req.body)
  .then(call => {
      if(call) {
    res.status(201)
    res.send("Account Registered")}
    else{
    
    res.status(401)
    res.send("Username is already taken.")}
  })

});

app.post('/userLogin', (req, res) => {

  api.authenticateUser(req.body)
  .then(result => {
    if(result){
      console.log(result);
      res.status(201)
      res.json(result)
    }
    else{
      res.status(401)
      res.send("Incorrect Username/Password combination.")
    }
  })
});

app.use((req, res, next) => {
  const authToken = req.get("authorization");
  if (authToken) {
    const userData = auth.validateToken(authToken);
    if (userData) {
      if (userData.username) {
        req.body.username = userData.username;
        return next();
      }
      return res.status(403).json({ error: 'Invalid data in token!' });
    }
    return res.status(403).json({ error: 'Invalid token!' });
  }
  return res.status(403).json({ error: 'No credentials sent!' });
})

app.post('/test', (req, res) => {
  res.status(200).json({ message: 'Success!', user: req.body.username });
});



module.exports = app;
