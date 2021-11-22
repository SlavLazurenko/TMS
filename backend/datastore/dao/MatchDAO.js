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

  async add(eventId, ...docs) {

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
