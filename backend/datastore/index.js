require('dotenv').config();
const { MongoClient } = require('mongodb');
const UserDao = require("./dao/UserDAO");
const AccountDao = require("./dao/AccountDAO");

/**
 * Group of datastore classes
 * @namespace Datastore
 */

/**
 * Singleton of datastore used to communicate with MongoDB
 * @memberof Datastore
 * @public
 */
class Datastore {
  /**
   * Initializes Datastore object with MongoClient connection
   */
  constructor() {
    const url = process.env.MONGODB_URI;
    /**
     * MongoDB client reference 
     * @type {MongoClient}
     * @private
     */
    this.client = new MongoClient(url);
  }

  /**
   * Performs connection to MongoDB and 
   * initializes database access objects (DAO)
   */
  async init() {
    try {
      await this.client.connect();
      console.log('Successfully connected to MongoDB');

      const db = this.client.db("tms");
      /**
       * Database access object (DAO) for users collection
       * @type {UserDao}
       * @public
       */
      this.user = new UserDao(db);

      /**
       * Database access object (DAO) for accounts collection
       * @type {AccountDao}
       * @public
       */
      this.account = new AccountDao(db);

    } catch (e) {
      console.log('Connection to MongoDB failed', e);
    }
  }
}

module.exports = new Datastore();