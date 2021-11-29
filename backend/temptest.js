const axios = require("axios")
const Datastore = require("./datastore")
async function tester(id){
 
    await Datastore.init();
    await Datastore.event.update({id: 1}, {status: "temp"})
    .then(call => {
      console.log(call)
    })

}

tester(1)