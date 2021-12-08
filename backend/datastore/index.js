require('dotenv').config(); //{path: __dirname+'/./../../.env'}
const { MongoClient } = require('mongodb');

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
       * @type {Datastore.UserDao}
       * @public
       */
      this.user = require('./dao/UserDAO');
      this.user.injectDB(db);

      /**
       * Database access object (DAO) for accounts collection
       * @type {Datastore.AccountDao}
       * @public
       */
      this.account = require('./dao/AccountDAO');
      this.account.injectDB(db);

      /**
       * Database access object (DAO) for events collection
       * @type {Datastore.EventDao}
       * @public
       */

      this.event = require('./dao/EventDAO');
      this.event.injectDB(db);

      /**
       * Database access object (DAO) for match documents in events collection
       * @type {Datastore.EventDao}
       * @public
       */
      this.match = require("./dao/MatchDAO");
      this.match.injectDB(db);

      /**
       * Database access object (DAO) for teams collection
       * @type {Datastore.TeamDao}
       * @public
       */
      this.team = require('./dao/TeamDAO');
      this.team.injectDB(db);

      return true;

    } catch (e) {
      console.log('Connection to MongoDB failed', e);
      return false;
    }
  }

  isConnected() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }
}

module.exports = new Datastore();
