const Datastore = require("../datastore/index.js");

async function user() {
  await Datastore.init();

  let result;

  // result = await Datastore.user.add(
  //   {
  //     tag: "NewUser#2", 
  //     email: "second@email.com", 
  //     discordTag: "second"
  //   },
  //   {
  //     tag: "NewUser#3", 
  //     email: "third@email.com", 
  //     discordTag: "none"
  //   },
  //   {
  //     tag: "NewUser#4", 
  //     email: "fourth@email.com", 
  //     discordTag: "fourth"
  //   }
  // );

  // result = await Datastore.user.update({tag: "Testuser"}, {discordTag: `testuser#${Math.round(Math.random() * 10000)}`});

  // result = await Datastore.user.find({tag: "Testuser"});

  // result = await Datastore.user.remove({tag: "NewUser#2"});

  console.log(result);
}

async function event() {
  await Datastore.init();

  let result;

  const event1 = {
    id: 1,
    name: "Test Event",
    accessibility: "Public",
    type: "SingleElimination",
    description: "test event description",
    admin: "Eventski596",
    start: new Date(2021, 11, 1, 14, 00),
    end: new Date(2021, 11, 8, 20, 00),
    maxParticipants: 8,
    participants: ["Testuser", "NewUser#3", "NewUser#4", "NewUser#2"],
    matches: [
      { 
        id: 1, 
        competitors: ["Testuser", "NewUser#3"], 
        result: null
      },
      { 
        id: 2, 
        competitors: ["NewUser#4", "NewUser#2"], 
        result: null
      },
      { 
        id: 3, 
        competitors: [null, null], 
        result: null
      },
      { 
        id: 4, 
        competitors: [null, null], 
        result: null
      }
    ]
  }

  const event2 = {
    id: 2,
    name: "Test Event No. 2",
    accessibility: "Public",
    type: "SingleElimination",
    description: "test event description",
    admin: "Eventski596",
    start: new Date(2021, 10, 16, 16, 00),
    end: new Date(2021, 10, 16, 18, 00),
    maxParticipants: 8,
    participants: ["Testuser", "NewUser#3", "NewUser#4", "NewUser#2"],
    matches: [
      { 
        id: 5, 
        competitors: ["Testuser", "NewUser#2"], 
        result: [2, 5]
      },
      { 
        id: 6, 
        competitors: ["NewUser#3", "NewUser#4"], 
        result: [2, 1]
      },
      { 
        id: 7, 
        competitors: ["NewUser#2", "NewUser#3"], 
        result: [4, 0]
      }
    ]
  }

  // result = await Datastore.event.add(event1, event2);

  // result = await Datastore.event.find({participants: "Testuser"}); //events where user participates in
  
  // result = await Datastore.event.findMatchOf("NewUser#2"); //matches that user participated in

  result = await Datastore.event.addParticipant(2, "slav", "sagepages", "luffy");

  console.log(result);
}

async function match() {
  await Datastore.init();

  let result;

  // result = await Datastore.match.find({competitors: "NewUser#3"});

  // result = await Datastore.match.add(2, 
  //   {
  //     competitors: ["NewUser#3", "NewUser#2"],
  //     result: null
  //   },
  //   {
  //     competitors: ["some1", "some2"],
  //     result: [5, 5]
  //   }
  // );

  result = await Datastore.match.find(3, 1);

  // result = await Datastore.match.update(2, 2, { result: [3,9] });

  // result = await Datastore.match.remove(2, 8);

  console.log(result);
}

async function account() {
  await Datastore.init();

  let result;

  // result = await Datastore.account.findByUsername("Eventski596");
  // result = await Datastore.account.find();
  // result = await Datastore.account.add({ username: "newuser", password: "coolpass"});
  // result = await Datastore.account.update({ username: "newuser"}, {password: "newpass"});
  // result = await Datastore.account.remove({username: "newuser"});



  console.log(result);
}

async function team() {
  await Datastore.init();

  let result;

  // result = await Datastore.team.add({
  //   tag: "Power Rangers",
  //   owner: "Eventski596",
  //   logo: "/some/logo.png",
  //   members: ["Eventski596"]
  // });

  // result = await Datastore.team.find({});

  result = await Datastore.team.findTeamOf("slav");

  // result = await Datastore.team.addMember("Power Rangers", "Testuser");

  console.log(result);
}

event();
