require('dotenv').config();
const { MongoClient } = require('mongodb');

//IMPLEMENT ASYNC FUNCTIONS TO CALL MONGO (CONNECT, FIND)

let client = null;

isArray = function(a) {
  return (!!a) && (a.constructor === Array);
};

isObject = function(a) {
  return (!!a) && (a.constructor === Object);
};

isEmptyObject = function(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

const init = async() => {
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("MongoDB connection successful");
    return true;
  } catch (e) {
    console.log("MongoDB connection failed");
    return false;
  }
}

const get = async() => {
  try {
    if (client != null || await init()) return client;

    throw new Error('Error connecting to db');

  } catch (e) {
    console.log("get error", e);
    return false;
  }
}

const user = {

  add: async(...docs) => {
    try {

      const result = await (await get()).db('tms').collection('users').insertMany(docs, {ordered: false});
      return result;

    } catch (e) {
      console.log("user add error", e);
      return false;
    }
  },
  update: async(filter, data) => {
    try {
      const result = await (await get()).db('tms').collection('users').updateMany(filter, {$set: data});
      return result;

    } catch (e) {
      console.log("user update error", e);
      return false;
    }
  },
  find: async(filter) => {
    try {
      const result = await (await get()).db('tms').collection('users').find(filter).toArray();
      return result;

    } catch (e) {
      console.log("user find error", e);
      return false;
    }

  },
  delete: async(filter) => {
    try {
      if(isEmptyObject(filter)) {
        throw new Error('Argument for user.delete() cannot be empty');
      }

      const result = await (await get()).db('tms').collection('users').deleteOne(filter);
      return result;

    } catch (e) {
      console.log("user find error", e);
      return false;
    }

  }
}

module.exports = { get: get, user: user }

/*
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
*/



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