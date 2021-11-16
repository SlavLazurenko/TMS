const Dao = require("./DAO.js");

/**
 * Class for communicating with users collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class UserDao extends Dao {
  constructor(db) {
    super(db, "users");
  }

  /**
   * Adds new user(s) documents to the database
   * @param  {...Datastore.UserData} docs user document(s) to be added
   * @returns {Datastore.AddResult} add result
   */
  async add(...docs) {
    return super.add(...docs);
  }

  /**
   * Updates existing user document(s) that satisfy selector
   * @param {Datastore.UserSelector} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {Datastore.UpdateResult} update operation result
   */
  async update(selector, data) {
    return super.update(selector, data);
  }

  /**
   * Finds user document which satisfies selector
   * @param {Datastore.UserSelector} selector target document selector
   * @returns {Datastore.UserData|{error: Object}} found document or error object
   */
  async find(selector, options = defaultFindOptions) {
    return super.find(selector, options);
  }

  /**
   * Finds user document which satisfies user tag
   * @param {string} tag username
   * @returns {Datastore.UserData|{error: Object}} found document or error object
   */
  async findByTag(tag) {
    return this.find({tag: tag});
  }

  /**
   * Removes user document which satisfies the selector
   * @param {Datastore.UserSelector} selector target document selector
   * @returns {Datastore.RemoveResult} remove result
   */
  async remove(selector) {
    return super.remove(selector);
  }
}

module.exports = UserDao;

/**
 * Used to specify target document in users collection to execute different operations against
 * @memberof Datastore
 * @typedef {Object} UserSelector
 * @property {string} [tag] to match the document with tag
 * @property {string} [discordTag] to match the document with discordTag
 * @property {string} [email] to match the document with email
 */

/**
 * User data structure
 * @memberof Datastore
 * @typedef {Object} UserData
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {string} tag username - main identifier of the user
 * @property {string} discordTag user's discord tag
 * @property {string} email user's email address
 */
