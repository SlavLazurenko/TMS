const api = require("../logic/api");
const Datastore = require("../datastore");

async function test() {
  await Datastore.init();

  let result = await api.getEvents("", "");
  console.log(result);
}

test();
