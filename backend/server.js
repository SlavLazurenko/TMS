const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./logic/api');
const auth = require('./authentication.js');
const Event = require('./logic/Event');
const fileUpload = require('express-fileupload');
const cookiesMiddleware = require('universal-cookie-express');
const datastore = require('./datastore');


app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(fileUpload());


app.get('/get-message', (req, res) => {
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
});

app.post("/registerUser", (req, res) => {

  api.registerUser(req.body)
  .then(call => {
    if(call) {
      res.status(201)
      res.send("Account Registered")
    }
    else {
      res.status(401)
      res.send("Username is already taken.")
    }
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

app.use(cookiesMiddleware());

app.use((req, res, next) => {   //AUTHENTICATE USER
  const authToken = req.universalCookies.get("authToken");
  if (authToken) {
    const userData = auth.validateToken(authToken);
    if (userData) {
      if (userData.username) {
        req.body.username = userData.username;
      }
    }
  }
  next();
})

app.get('/get-user/:tag', (req, res) => {
  Promise.all([
    api.getUser(req.params.tag),
    api.getUserTeam(req.params.tag)
  ])
  .then(data => {
    if (data[0]) {
      const userData = {};
      userData.account = data[0];
      if (data[1]) {
        userData.teams = data[1].map(team => {
          return {...team, role: (team.owner == req.params.tag) ? "owner" : "member"}
        });
      }
      if (userData.account.tag != req.body.username) {
        delete userData.account.email;  //HIDE EMAIL
      }
      res.status(200).json(userData);
    }
    else {
      res.status(404).json({error: `User ${req.params.tag} not found`});
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: "Unknown server error"});
  })

});


app.use((req, res, next) => {   //ENFORCE AUTHENTICATION
  if (!req.body.username) {
    return res.status(401).json({error: "Not authenticated"});
  }
  next();
})

app.post('/eventRegistration', (req, res) => {
  try {                                             // check if req.body has file before making api req
    if(!req.files) {
      res.status(401)
      res.send("Image is required.")
    } 
    else{

      let avatar = req.files.file;
      let fileType
      if(avatar.mimetype == "image/jpeg"){
          fileType = ".jpg"
      }
      if(avatar.mimetype == "image/png"){
        fileType = ".png"
      }

      avatar.name = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + fileType
      avatar.mv('../frontend/public/img/event-images/' + avatar.name);

      api.registerEvent(req.body, req.files)
      .then(call => {
        if(call) {
          res.status(201)
          res.send("Event Created")
        }
        else {
          res.status(401)
          res.send("Error: Event Not Created")
        }
      })
    }
  } catch (err) {
    res.status(500)
  }
});

app.post('/test', (req, res) => {
  res.status(200).json({ message: 'Success!', user: req.body.username });
});

app.get('/createMatches/:eventId', async (req, res) => {
  const event = await Event.fromId(req.params.eventId);
  if(event){

    if(event.status == "pending"){
      
      const matches = event.initMatches();
      if(matches){
        const changeStatus = await datastore.event.update({id: parseInt(req.params.eventId)}, {status: "inProgress"})
        if(changeStatus){

          res.status(200).json(event);
        }
        else{
          res.status(404);
          res.send("Error")
        }

      }
      else{
        res.status(404);
        res.send("Error")
      }
    }
    else{
      res.status(404)
      res.send("Match is already in progress.")
    }
  }
  else{
    res.status(404)
    res.send("Error")
  }

})

app.get('/getEvent/:eventId', async (req, res) => {
    await Event.fromId(req.params.eventId)
    .then(event => {

      if(event) {
        res.status(200)
        res.send(event)
      }
      else{
        
        res.status(401)
        res.send("Admin must create bracket before you can retrieve it.")
        
      }
    })

})

app.post('/submitResults', async (req, res) => {
  
  const event = await Event.fromId(req.body.eventid);

  console.log(event)
  
  if(event){

    const result = await event.addResult(req.body.matchid, req.body.username, req.body.res1, req.body.res2);
    res.status(200)
    res.send(result)
  }
  else{
    
    res.status(400)
    res.send("Error: app.post(/submitResults)")
  }
  
})

module.exports = app;
