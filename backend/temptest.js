const axios = require("axios")
const Datastore = require("./datastore")


async function tester(id, res1, res2){
 
    await Datastore.init();
  
    axios.post('http://localhost:3001/submitResults', {id: id, res1: res1, res2: res2})
    .then(res => {
          console.log("here")
    })
    .catch(err => {
      console.log("catch error")
    })

}

tester(1, 4, 3)