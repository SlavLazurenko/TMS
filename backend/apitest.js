const { validateCredentials, storeCredentials } = require('./authentication')
const Datastore = require('./datastore')

async function validate(){

    await Datastore.init()

    test = {username: "sagepages", password: "123"}
    let result = await validateCredentials(test.username, test.password)

    console.log(result)

    // let result = await storeCredentials(test.username, test.password)
    // console.log(result)

}

validate()