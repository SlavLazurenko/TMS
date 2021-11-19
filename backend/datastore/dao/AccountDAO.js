const Dao = require("./DAO.js");

/**
 * Class for communicating with accounts collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class AccountDao extends Dao {
  constructor() {
    super();
  }
  
  /**
   * Initializes connection with collection
   * @param {Db} db MongoDB Db object
   */
  injectDB(db) {
    super.injectDB(db, "accounts");
  }

  /**
   * Finds account which satisfies username
   * @param {string} username user tag used to search for account
   * @returns {Datastore.AccountData|{error: Object}} found document or error object
   */
  async findByUsername(username) {
    return this.find({username: username});
  }
}

module.exports = new AccountDao();

/**********************************************/
/************* INHERITED METHODS **************/
/**********************************************/

/**
 * Adds new account(s) documents to the database
 * @name Datastore.AccountDao#add
 * @function
 * @async
 * @override
 * @param  {...Datastore.AccountData} docs account document(s) to be added
 * @returns {Datastore.AddResult} add result
 */

/**
 * Updates existing account document(s) that satisfy selector
 * @name Datastore.AccountDao#update
 * @function
 * @async
 * @override
 * @param {Datastore.AccountSelector} selector target document selector
 * @param {Object} data key value pairs which define modifications
 * @returns {Datastore.UpdateResult} update operation result
 */

/**
 * Finds account document which satisfies selector
 * @name Datastore.AccountDao#find
 * @function
 * @async
 * @override
 * @param {Datastore.AccountSelector} selector target document selector
 * @returns {Datastore.AccountData|{error: Object}} found document or error object
 */

/**
 * Removes account document which satisfies the selector
 * @name Datastore.AccountDao#remove
 * @function
 * @async
 * @override
 * @param {Datastore.AccountSelector} selector target document selector
 * @returns {Datastore.RemoveResult} remove result
 */

/**********************************************/
/************** DATA STRUCTURES ***************/
/**********************************************/

/**
 * Used to specify target document in accounts collection to execute different operations against
 * @typedef {Object} AccountSelector
 * @memberof Datastore
 * @property {string} [username] to match the document with username
 * @property {string} [password] to match the document with hashed password
 */

/**
 * Account data structure
 * @typedef {Object} AccountData
 * @memberof Datastore
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {string} username account's username (same as user's tag)
 * @property {string} password account's hashed password
 */
