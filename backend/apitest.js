const { validateCredentials, storeCredentials } = require('./authentication')
const Datastore = require('./datastore')
const api = require('./logic/api.js')

async function validate(){

    await Datastore.init()

    // test = {username: "sagepages", password: "123"}
    // let result = await validateCredentials(test.username, test.password)
    let result = await api.getUserTeam("slavi");

    console.log(result)

    // let result = await storeCredentials(test.username, test.password)
    // console.log(result)

}

validate()