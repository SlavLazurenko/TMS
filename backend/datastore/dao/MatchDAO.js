const Dao = require("./DAO.js");

/**
 * Class for communicating with match sub-documents in events collection in MongoDB
 * @extends Datastore.Dao
 * @memberof Datastore
 */
class MatchDao extends Dao {
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
   * Adds match(es) to event document
   * @param {number} eventId id of event where matches will be added
   * @param  {...Datastore.MatchData} docs matches to be added to event match list
   * @returns {Datastore.UpdateResult|{error: Object}} update result or error object
   */
  async add(eventId, ...docs) {
    try {
      const event = await this.collection.findOne(
        { 
          id:eventId 
        }, 
        {
          projection: { _id: 0, numMatches: { $size: "$matches" } }
        }
      );

      const matches = docs.map((match) => {
        return { 
          id: ++event.numMatches, 
          competitors: [],
          result: null,
          ...match 
        };
      });

      const result = await this.collection.updateOne(
        {
          id: eventId
        },
        {
          $addToSet: { matches: { $each: matches } }
        }
      );

      return { count: result.modifiedCount };
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

  /**
   * 
   * @param {number} eventId 
   * @param {number} matchId 
   * @param {Datastore.MatchData} data 
   */
  async update(eventId, matchId, data) {
    try {
      const setObj = {};
      for (const field in data) {
        setObj[`matches.$.${field}`] = data[field];
      }
      const result = await this.collection.updateOne(
        {
          id: eventId,
          matches: { $elemMatch: { id: matchId } }
        },
        {
          $set: setObj
        }
      )

      return { count: result.modifiedCount };
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

  /**
   * Finds match record
   * @param {number} eventId id of event where match is located
   * @param {number} matchId id of match in this event
   * @returns {Datastore.MatchData|{error: Object}|undefined} match document if found or error object
   */
  async find(eventId, matchId) {
    try {
      const result = await this.collection.findOne(
        {
          id: eventId
        }, 
        {
          projection: { _id: 0, matches: { $elemMatch: { id: matchId } } }
        }
      );

      if (result && result.matches && result.matches[0])
        return result.matches[0];
      else
        return null;
    } catch (e) {
      return { error: e };
    }
  }

  /**
   * Removes match from matches array of event document
   * @param {number} eventId id of event where matches will be added
   * @param {number} matchId id of match in this event
   * @returns {Datastore.UpdateResult|{error: Object}} update result or error object
   */
   async remove(eventId, matchId) {
    try {
      const result = await this.collection.updateOne(
        {
          id: eventId
        },
        {
          $pull: { matches: { id: matchId } }
        }
      );

      return { count: result.modifiedCount };
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

}

module.exports = new MatchDao();


/**********************************************/
/************** DATA STRUCTURES ***************/
/**********************************************/

/**
 * Match data structure
 * @typedef {Object} MatchData
 * @memberof Datastore
 * @property {number} id unique match identifier within event
 * @property {string[2]} competitors list of tags of participants that are a part of this match
 * @property {number[2]} result match result representation
 */
