const Dao = require("./DAO.js");

/**
 * Class for communicating with users collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class UserDao extends Dao {
  constructor() {
    super();
  }

  /**
   * Initializes connection with collection
   * @param {Db} db MongoDB Db object
   */
  injectDB(db) {
    super.injectDB(db, "users");
  }

  /**
   * Finds user document which satisfies user tag
   * @param {string} tag username
   * @returns {Datastore.UserData|{error: Object}} found document or error object
   */
  async findByTag(tag) {
    return this.find({tag: tag});
  }
}

module.exports = new UserDao();

/**********************************************/
/************* INHERITED METHODS **************/
/**********************************************/

/**
 * Adds new user(s) documents to the database
 * @name Datastore.UserDao#add
 * @function
 * @async
 * @override
 * @param  {...Datastore.UserData} docs user document(s) to be added
 * @returns {Datastore.AddResult} add result
 */

/**
 * Updates existing user document(s) that satisfy selector
 * @name Datastore.UserDao#update
 * @function
 * @async
 * @override
 * @param {Datastore.UserSelector} selector target document selector
 * @param {Object} data key value pairs which define modifications
 * @returns {Datastore.UpdateResult} update operation result
 */

/**
 * Finds user document which satisfies selector
 * @name Datastore.UserDao#find
 * @function
 * @async
 * @override
 * @param {Datastore.UserSelector} selector target document selector
 * @param {Object} [options] regulates format of returned document
 * @param {boolean} [options.findOne=true] returns first found document, array otherwise
 * @returns {Datastore.UserData|{error: Object}} found document or error object
 */

/**
 * Removes user document which satisfies the selector
 * @name Datastore.UserDao#remove
 * @function
 * @async
 * @override
 * @param {Datastore.UserSelector} selector target document selector
 * @returns {Datastore.RemoveResult} remove result
 */


/**********************************************/
/************** DATA STRUCTURES ***************/
/**********************************************/

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
