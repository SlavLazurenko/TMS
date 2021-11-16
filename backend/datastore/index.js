require('dotenv').config();
const { MongoClient } = require('mongodb');
const AccountDao = require('./dao/AccountDAO');
const EventDao = require('./dao/EventDAO');
const TeamDao = require('./dao/TeamDAO');
const UserDao = require('./dao/UserDAO');

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
   * @pre isConnected() = false
   * @post isConnected() = true
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

      /**
       * Database access object (DAO) for events collection
       * @type {EventDao}
       * @public
       */
      this.event = new EventDao(db);

      /**
       * Database access object (DAO) for teams collection
       * @type {TeamDao}
       * @public
       */
      this.team = new TeamDao(db);

    } catch (e) {
      console.log('Connection to MongoDB failed', e);
    }
  }

  isConnected() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }
}

module.exports = new Datastore();
