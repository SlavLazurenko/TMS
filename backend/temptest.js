const axios = require("axios")

function tester(id){
 
    axios.get('http://localhost:3001/createMatches', id)
    .then(res => {
        console.log(`${res.status} ${res.statusText}: ${res.response}`)
        console.log(res.body)
      })
      .catch(e => {
        console.log(e.response.data)
        console.log(`${e} ${e.response.data}`)
      
      })

}

tester(1)