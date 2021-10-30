require('dotenv').config();
const { MongoClient } = require('mongodb');
const UserDao = require("./UserDAO");

class Datastore {
  constructor() {
    const url = process.env.MONGODB_URI;
    this.client = new MongoClient(url);
  }

  async init() {
    try {
      await this.client.connect();
      console.log('Successfully connected to MongoDB');

      const db = this.client.db("tms");
      this.user = new UserDao(db);

    } catch (e) {
      console.log('Connection to MongoDB failed', e);
    }
  }
}

module.exports = new Datastore();