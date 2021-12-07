const express = require('express');
const cors = require('cors');
const app = express();
const api = require('./logic/api');
const auth = require('./authentication.js');
const Event = require('./logic/Event');
const fileUpload = require('express-fileupload');
const cookiesMiddleware = require('universal-cookie-express');
const datastore = require('./datastore');

const expressWs = require('express-ws')(app);
// const eventWebsocket = require('./websocket.js');
const wss = expressWs.getWss();

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(fileUpload());


app.get('/get-message', (req, res) => {
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
});

app.get('/get-events', (req, res) => {
  api.getEvents("", "")
  .then(events => {
    res.status(200).json(events);
  })
  .catch(err => {
    res.status(500).json({error: "Server Error"});
  })
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
  const authToken = req.universalCookies.get("authToken")
  console.log(req.universalCookies);
  if (authToken) {
    const userData = auth.validateToken(authToken);
    if (userData) {
      if (userData.username) {
        req.body.username = userData.username;
      }
    }
  }
  next();
});


const events = {};

function broadcastEventData(event) {
  wss.clients.forEach(function each(client) {
    if (client.eventId == event.id) {
      client.send(JSON.stringify({action: 'set-event', data: event}));
    }
  });
}

app.ws('/ws/event/:id', async function(ws, req) {
  ws.eventId = req.params.id;
  ws.username = req.body.username;

  let c = 0;
  wss.clients.forEach(function each(client) {
    c++;
  });
  
  console.log(`connected ${ws.eventId} (${c})`);

  if (events[ws.eventId] === undefined) {
    const event = await Event.fromId(ws.eventId);
    if (event) {
      events[ws.eventId] = event;
    }
  }

  ws.send(JSON.stringify({action: 'set-event', data: events[ws.eventId]}));

  ws.on('message', async function(msg) {
    console.log(`Received: ${msg}`);
    const { eventId, username } = ws;
    msg = JSON.parse(msg);
    if (msg.action == 'create-matches') {
      let response;
      const event = events[eventId];
      if (event) {
        if (event.status == "pending") {
          if (event.participants.length > 1) {
            const matches = event.initMatches();
            if (matches) {
              const changeStatus = await datastore.event.update(
                {id: parseInt(eventId)}, 
                {status: "inProgress"}
              );
              if (changeStatus) {
                event.status = "inProgress";
                response = { status: 200, message: 'Event started' }
              }
              else {
                response = { status: 500, error: 'Failed to start event' }
              }
            }
            else {
              response = { status: 500, error: 'Server error: failed to generate matches' }
            }
          }
          else {
            response = { status: 400, error: 'Not enough participants to start event' }
          }
        }
        else {
          response = { status: 400, error: 'Event already started or finished' }
        }
      }
      else {
        response = { status: 404, error: 'Event not found' }
      }

      // RESPOND TO CLIENT
      ws.send(JSON.stringify({
        ...response,
        action: 'create-matches'
      }));

      // UPDATE EVENT DATA FOR EVERYBODY
      if (response.status == 200) {
        broadcastEventData(event);
      }
    }
    else if (msg.action == 'participate') {
      let response;

      const event = events[eventId];
    
      if (event) {
        const result = await event.addParticipant(username);
        switch (result) {
          case 'SUCCESS':
            !event.participants.includes(username) ? event.participants.push(username) : '';
            response = { status: 200, message: 'Successfully registered for event' };
            break;
          case 'DB_FAIL':
            response = { status: 500, error: 'Server failed to add participant' }
            break;
          case 'LIST_FULL':
            response = { status: 400, error: 'List of participants is already full' }
            break;
          case 'ALREADY_STARTED':
            response = { status: 400, error: 'Event already started' }
            break;
          default:
            response = { status: 500, error: 'Unknown error' }
        }
      }
      else {
        response = { status: 404, error: 'Event not found' }
      }

      // RESPOND TO CLIENT
      ws.send(JSON.stringify({
        ...response,
        action: 'participate'
      }));

      // UPDATE EVENT DATA FOR EVERYBODY
      if (response.status == 200) {
        broadcastEventData(event);
      }
    }
    else if (msg.action == 'submit-result') {
      const event = events[eventId];
      const {data} = msg;
  
      if(event){
    
        const result = await event.addResult(data.matchid, username, data.res1, data.res2);
        if (result == "SUCCESS") {

          response = { status: 200 };
        }
        else if (result == "NOT_AUTHORIZED") {
          response = { status: 401, error: 'Unauthorized' };
        }
        else {
          response = { status: 400, error: 'Operation failed' };
        }
      }
      else{
        response = { status: 404, error: 'Event not found' }
      }

      // RESPOND TO CLIENT
      ws.send(JSON.stringify({
        ...response,
        action: 'participate'
      }));

      // UPDATE EVENT DATA FOR EVERYBODY
      if (response.status == 200) {
        broadcastEventData(event);
      }
    }
  });
});

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


app.use((req, res, next) => {   //ENFORCE AUTHENTICATION
  if (!req.body.username) {
    return res.status(401).json({error: "Not authenticated"});
  }
  next();
});

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
      if (event.participants.length > 1) {
        const matches = event.initMatches();
        if(matches){
          const changeStatus = await datastore.event.update({id: parseInt(req.params.eventId)}, {status: "inProgress"});
          if(changeStatus){
  
            res.status(200).json(event);
          }
          else{
            res.status(404);
            res.send("Error");
          }
  
        }
        else{
          res.status(404);
          res.send("Error");
        }
      }
      else {
        res.status(404);
        res.send("Error");
      }
    }
    else{
      res.status(404);
      res.send("Match is already in progress.");
    }
  }
  else{
    res.status(404)
    res.send("Error")
  }

})

app.post('/participate', async (req, res) => {
  const { eventId, username } = req.body;

  const event = await Event.fromId(eventId);

  if (event) {
    const result = await event.addParticipant(username);
    switch (result) {
      case 'SUCCESS':
        res.status(200).json({message: "Successfully registered for event."});
        break;
      case 'DB_FAIL':
        res.status(500).json({message: "Can't participate. Server failed to add participant."});
        break;
      case 'LIST_FULL':
        res.status(400).json({message: "Can't participate. List of participants is already full."});
        break;
      case 'ALREADY_STARTED':
        res.status(400).json({message: "Can't participate. Event already started."});
        break;
      default:
        res.status(500).json({message: "Unknown error"});
    }
  }
})

app.post('/submitResults', async (req, res) => {
  
})

module.exports = app;
