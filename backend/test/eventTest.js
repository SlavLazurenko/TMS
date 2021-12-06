const Event = require("./logic/Event.js");
const Datastore = require("./datastore");

(async function() {
  await Datastore.init();

  let event = await Event.fromId('2');
  // await event.initMatches();

  // await event.addResult(1, 'slav', 3, 1);

  let result = await event.addParticipant("luffy");

  console.log(event);

  // console.log(result);
})();


/*
const result = await Datastore.match.collection.updateOne(
  {
    id: 1
  },
  {
    $set: { 'matches.10.competitors.1': "hello" }
  }
);
*/