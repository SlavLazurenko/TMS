const Dao = require("./DAO");
const UserDao = require("./UserDAO");

/**
 * Class for communicating with teams collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class TeamDao extends Dao {
  constructor() {
    super();
  }

  /**
   * Initializes connection with collection
   * @param {Db} db MongoDB Db object
   */
  injectDB(db) {
    super.injectDB(db, "teams");
  }

  /**
   * Adds user(s) to members array of team document
   * @param {string} teamTag name of team
   * @param  {...string} username user tag(s)
   * @returns {Datastore.UpdateResult} update operation result
   */
  async addMember(teamTag, ...username) {
    try {
      const result = await this.collection.updateOne(
        { 
          tag: teamTag 
        }, 
        {
          $addToSet: { members: { $each: username } }
        }
      );

      return { count: result.modifiedCount };
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

  /**
   * Finds team document which satisfies selector
   * @param {Datastore.TeamSelector} selector target document selector
   * @param {Object} [options] regulates format of returned document
   * @param {boolean} [options.findOne=true] returns first found document, array otherwise
   * @param {boolean} [options.memberDetails=true] more information in members array
   * @returns {Datastore.TeamData[]|{error: Object}} found documents or error object
   */
  async find(selector={}, { findOne = true, memberDetails = true }={}) {
    try {
      //TODO: call super.find()
      let result;
      if (findOne) {
        result = await this.collection.findOne(selector);

        if (memberDetails) {
          const memberDocs = await this.resolveUsers(...result.members);
          if (!memberDocs.error) {
            result.members = memberDocs;
          }
        }

      } else {
        result = await this.collection.find(selector).toArray();

        if (memberDetails) {
          result.forEach(async (team) => {
            const memberDocs = await this.resolveUsers(...team.members);
            if (!memberDocs.error) {
              team.members = memberDocs;
            }
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
    return UserDao.find({ tag: {$in: tags} }, { findOne: false });
  }

  /**
   * Finds team document which satisfies selector
   * @param {Datastore.TeamSelector} tag 
   * @param {Object} [options] regulates format of returned document
   * @param {boolean} [options.memberDetails=true] more information in members array
   * @returns @returns {Datastore.TeamData|{error: Object}} found document or error object
   */
  async findByTag(tag, { memberDetails = true }={}) {
    return this.find({tag: tag}, {memberDetails: memberDetails});
  }
}

module.exports = new TeamDao();

/**********************************************/
/************* INHERITED METHODS **************/
/**********************************************/

/**
 * Adds new team(s) documents to the database
 * @name Datastore.TeamDao#add
 * @function
 * @async
 * @override
 * @param  {...Datastore.TeamData} docs team document(s) to be added
 * @returns {Datastore.AddResult} add result
 */

/**
 * Updates existing team document(s) that satisfy selector
 * @name Datastore.TeamDao#update
 * @function
 * @async
 * @override
 * @param {Datastore.TeamSelector} selector target document selector
 * @param {Object} data key value pairs which define modifications
 * @returns {Datastore.UpdateResult} update operation result
 */

/**
 * Removes team document which satisfies the selector
 * @name Datastore.TeamDao#remove
 * @function
 * @async
 * @override
 * @param {Datastore.TeamSelector} selector target document selector
 * @returns {Datastore.RemoveResult} remove result
 */

/**********************************************/
/************** DATA STRUCTURES ***************/
/**********************************************/

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

