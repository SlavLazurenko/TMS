const auth = require('./authentication');
const Datastore = require("./datastore");

async function add() {
    await Datastore.init();
  
    let result;
  
    result = await auth.storeCredentials('carly','12345');
      
    console.log(result);
  }

async function validate(){
    await Datastore.init();

    let result;

    result = await auth.validateCredentials('carly','123');

    console.log(result);
}

async function token(){
    await Datastore.init();

    let result;

    result = auth.validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhcmx5IiwiaWF0IjoxNjM3NTU3OTgwfQ.Sr3Z9VsAdNx9wP-CBxt5dr55blnHSfwfcove6y9L8Ng');

    console.log(result);
} 
token();