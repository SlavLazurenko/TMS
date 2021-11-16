const Dao = require("./DAO");
const UserDao = require("./UserDAO");

class TeamDao extends Dao {
  constructor(db) {
    super(db, "teams");
  }

  /**
   * Adds new team(s) documents to the database
   * @param  {...Datastore.TeamData} docs team document(s) to be added
   * @returns {Datastore.AddResult} add result
   */
  async add(...docs) {
    return super.add(...docs);
  }

  /**
   * Updates existing team document(s) that satisfy selector
   * @param {Datastore.TeamSelector} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {Datastore.UpdateResult} update operation result
   */
  async update(selector, data) {
    return super.update(selector, data);
  }

  /**
   * Finds team document which satisfies selector
   * @param {Datastore.TeamSelector} selector target document selector
   * @param {Object} [options] regulates format of returned document
   * @param {boolean} [options.findOne=true] returns first found document, array otherwise
   * @param {boolean} [options.memberDetails=true] more information in members array
   * @returns {Datastore.TeamData[]|{error: Object}} found documents or error object
   */
  async find(selector, options = { findOne: true, memberDetails: true }) {
    try {
      let result;
      if (options.findOne) {
        result = await this.collection.findOne(selector);
        if (options.memberDetails)
          result.members = await this.resolveUsers(result.members);
      } else {
        result = await this.collection.find(selector).toArray();
        if (options.memberDetails) {
          result.forEach(async (team) => {
            team.members = await this.resolveUsers(team.members);
          });
        }
      }

      return result;
    } catch (e) {
      return { error: e };
    }
  }

  /**
   * Finds users
   * @private
   * @param {...string} tags users to be resolved
   * @returns {UserData[]} list of users found
   */
  async resolveUsers(...tags) {
    return UserDao.find({ tag: {$in: tags} }, { findOne: false }).toArray();
  }

  /**
   * Finds team document which satisfies selector
   * @param {Datastore.TeamSelector} tag 
   * @param {Object} [options] regulates format of returned document
   * @param {boolean} [options.memberDetails=true] more information in members array
   * @returns @returns {Datastore.TeamData|{error: Object}} found document or error object
   */
  async findByTag(tag, options = { memberDetails: true }) {
    return this.find({tag: tag}, options);
  }

  /**
   * Removes team document which satisfies the selector
   * @param {Datastore.TeamSelector} selector target document selector
   * @returns {Datastore.RemoveResult} remove result
   */
  async remove(selector) {
    return super.remove(selector);
  }
}

module.exports = TeamDao;

/**
 * Used to specify target document in teams collection to execute different operations against
 * @typedef {Object} TeamSelector
 * @memberof Datastore
 * @property {string} [tag] to match the document with tag
 * @property {string} [owner] to match the document with owner username (tag)
 */

/**
 * Team data structure
 * @typedef {Object} TeamData
 * @memberof Datastore
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {string} tag unique team name
 * @property {string} owner tag of the user that owns
 * @property {string[]} members users that are members of this team
 * @property {string} logo path to team's logo image file
 */

/**
 * Team data structure
 * @typedef {Object} TeamDataWithMembers
 * @memberof Datastore
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {string} tag unique team name
 * @property {string} owner tag of the user that owns
 * @property {Datastore.UserData[]} members users that are members of this team
 * @property {string} logo path to team's logo image file
 */

/**
 * Team start document
 * @typedef {Object} TeamEntry
 * @memberof Datastore
 * @property {string} tag unique team name
 * @property {string} owner tag of the user that owns
 * @property {Datastore.UserData[]} members users that are members of this team
 * @property {string} logo path to team's logo image file
 */

