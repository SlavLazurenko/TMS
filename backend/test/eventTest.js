const Event = require("../logic/Event.js");
const Datastore = require("../datastore");

(async function() {
  await Datastore.init();

  let event = await Event.fromId('1');
  // await event.initMatches();

  await event.addResult(1, 'luffy', 3, 1);

  console.log(event.matches);
})();