const Dao = require("./DAO.js");

/**
 * Class for communicating with events collection in MongoDB
 * @extends Dao
 * @memberof Datastore
 */
class EventDao extends Dao {
  constructor(db) {
    super(db, "events");
  }

  /**
   * Adds new event(s) documents to the database
   * @param  {...EventData} docs event document(s) to be added
   * @returns {AddResult} add result
   */
  async add(...docs) {
    return super.add(...docs);
  }

  /**
   * Updates existing event document(s) that satisfy selector
   * @param {EventSelector} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {UpdateResult} update operation result
   */
  async update(selector, data) {
    return super.update(selector, data);
  }

  /**
   * Finds event document which satisfies selector
   * @param {EventSelector} selector target document selector
   * @returns {EventData[]|{error: Object}} found document or error object
   */
  async find(selector) {
    try {
      const result = await this.collection.find(selector).toArray();
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  /**
   * Removes event document which satisfies the selector
   * @param {EventSelector} selector target document selector
   * @returns {RemoveResult} remove result
   */
  async remove(selector) {
    return super.remove(selector);
  }

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

module.exports = EventDao;

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

// const test = new EventDao;
// test.find({type:})