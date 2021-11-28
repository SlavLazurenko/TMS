const api = require('./logic/api')
const Datastore = require('./datastore')

let data = {email: "sagep123", username: "luffy4", password: "123", confirmpassword: "123"}


async function runSignup(data){
    
    await Datastore.init();
    const response = await api.registerUser(data)
    if (response){
        console.log(response)
    }
    else{
        console.log(response)
    }
    
}

runSignup(data)