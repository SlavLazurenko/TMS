require('dotenv').config();
const { MongoClient } = require('mongodb');

//IMPLEMENT ASYNC FUNCTIONS TO CALL MONGO (CONNECT, FIND)

class Datastore {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    await this.client.connect();
    console.log('Connected successfully to server');
  }

  findUser(userName) {
    const db = client.db('tms');
    const collection = db.collection('users');

    const result = await collection.findOne({tag: userName});

    return result;

    //USE ASYNC FUNCTIONS

  }
}



// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('users');

//   // the following code examples can be pasted here...
//   const findResult = await collection.find({}).toArray();
//   console.log('Found documents =>', findResult);

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());