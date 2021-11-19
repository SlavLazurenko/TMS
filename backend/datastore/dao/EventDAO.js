const Dao = require("./DAO.js");

/**
 * Class for communicating with events collection in MongoDB
 * @extends Datastore.Dao
 * @memberof Datastore
 */
class EventDao extends Dao {
  constructor() {
    super();
  }

  /**
   * Initializes connection with collection
   * @param {Db} db MongoDB Db object
   */
  injectDB(db) {
    super.injectDB(db, "events");
  }

  /**
   * Finds matches of a given user
   * TODO: move to separate class: MatchDao
   * @param {string} username unique user tag
   * @returns {Object[]} list of matches
   */
  async findMatchOf(username) {
    try {
      const events = await this.collection.find(
        {matches: { $elemMatch: {competitors: username}}}, 
        {
          projection: {_id: 0, matches: {$elemMatch: {competitors: username}}}
        }
      ).toArray();

      let result = [];

      events.forEach(doc => {
        doc.matches.forEach(match => {
          result.push(match);
        });
      });

      return result;
    } catch (e) {
      return { error: e };
    }
  }
}

module.exports = new EventDao();

/**********************************************/
/************* INHERITED METHODS **************/
/**********************************************/

/**
 * Adds new event(s) documents to the database
 * @name Datastore.EventDao#add
 * @function
 * @async
 * @override
 * @param  {...Datastore.EventData} docs event document(s) to be added
 * @returns {Datastore.AddResult} add result
 */

/**
 * Updates existing event document(s) that satisfy selector
 * @name Datastore.EventDao#update
 * @function
 * @async
 * @override
 * @param {Datastore.EventSelector} selector target document selector
 * @param {Object} data key value pairs which define modifications
 * @returns {Datastore.UpdateResult} update operation result
 */

/**
 * Finds event document which satisfies selector
 * @name Datastore.EventDao#find
 * @function
 * @async
 * @override
 * @param {Datastore.EventSelector} selector target document selector
 * @param {Object} [options] regulates format of returned document
 * @param {boolean} [options.findOne=true] returns first found document, array otherwise
 * @returns {Datastore.EventData[]|{error: Object}} found document or error object
 */

/**
 * Removes event document which satisfies the selector
 * @name Datastore.EventDao#remove
 * @function
 * @async
 * @override
 * @param {Datastore.EventSelector} selector target document selector
 * @returns {Datastore.RemoveResult} remove result
 */

/**********************************************/
/************** DATA STRUCTURES ***************/
/**********************************************/

/**
 * Used to specify target document in events collection to execute different operations against
 * @memberof Datastore
 * @typedef {Object} EventSelector
 * @property {number} [id] to match the document with event id
 * @property {string} [name] to match the document with event name
 * @property {"SingleElimination"|"DoubleElimination"|"Multilevel"|"RoundRobin"} [type] to match the documents with type 
 * @property {"Public"|"Private"|"InviteOnly"} [accessibility] to match the documents with accessibility
 * @property {string} [description] to match the documents with description
 */

/**
 * Event data structure
 * @memberof Datastore
 * @typedef {Object} EventData
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {number} id event unique identifier
 * @property {string} name event name
 * @property {"SingleElimination"|"DoubleElimination"|"Multilevel"|"RoundRobin"} type tournament type
 * @property {"Public"|"Private"|"InviteOnly"} accessibility defines under which circumstances event can be accessed
 * @property {string} description detailed description of event (rules, prizes, instructions, etc.)
 * @property {string} admin admin's username
 * @property {Date} start timestamp of event's start
 * @property {Date} end timestamp of event's end
 * @property {number} maxParticipants maximum number of participants allowed  
 */
