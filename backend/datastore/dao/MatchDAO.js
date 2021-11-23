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

  async find(selector, { eventSelector = {} }={}) {
    try {
      //TODO: change to aggregate
      const events = await this.collection.find(
        {
          matches: { $elemMatch: selector }, 
          ...eventSelector
        }, 
        {
          projection: {_id: 0, id: 1, matches: {$elemMatch: selector}}
        }
      );

      let result = [];

      await events.forEach(doc => {
        doc.matches.forEach(match => {
          result.push({eventId: doc.id, ...match});
        });
      });

      return result;
    } catch (e) {
      return { error: e };
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
