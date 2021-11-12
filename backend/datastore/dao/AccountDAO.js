const Dao = require("./DAO.js");

/**
 * Class for communicating with accounts collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class AccountDao extends Dao {
  constructor(db) {
    super(db, "accounts");
  }

  /**
   * Adds new account(s) documents to the database
   * @param  {...Datastore.AccountData} docs account document(s) to be added
   * @returns {Datastore.AddResult} add result
   */
  async add(...docs) {
    return super.add(...docs);
  }

  /**
   * Updates existing account document(s) that satisfy selector
   * @param {Datastore.AccountSelector} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {Datastore.UpdateResult} update operation result
   */
  async update(selector, data) {
    return super.update(selector, data);
  }

  /**
   * Finds account document which satisfies selector
   * @param {Datastore.AccountSelector} selector target document selector
   * @returns {Datastore.AccountData|{error: Object}} found document or error object
   */
  async find(selector) {
    return super.find(selector);
  }

  /**
   * Removes account document which satisfies the selector
   * @param {Datastore.AccountSelector} selector target document selector
   * @returns {Datastore.RemoveResult} remove result
   */
  async remove(selector) {
    return super.remove(selector);
  }
}

module.exports = AccountDao;

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
