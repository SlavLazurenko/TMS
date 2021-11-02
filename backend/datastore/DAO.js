const { isEmptyObject, getInsertedIds } = require("./utils.js");

/**
 * Class for basic communication with MongoDB collection
 * @memberof Datastore
 */
class Dao {
  /**
   * Initializes Dao object
   * @param {Db} db MongoDB Db object
   * @param {string} collection collection name
   */
  constructor(db, collection) {
    /**
     * MongoDB collection reference 
     * @type {Collection}
     * @private
     */
    this.collection = db.collection(collection);
  }

  /**
   * Adds new documents to the collection
   * @param  {...Object} docs document(s) to be added
   * @returns {AddResult} add result
   */
  async add(...docs) {
    try {

      const result = await this.collection.insertMany(docs, {ordered: false});
      return { count: result.insertedCount, ids: result.insertedIds };

    } catch (e) {
      if (e.result) {
        return { error: e, count: e.result.nInserted, ids: getInsertedIds(e) };
      }

      return { error: e };
    }
  }

  /**
   * Updates existing document(s) that satisfy selector
   * @param {Object} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {UpdateResult} update operation result
   */
  async update(selector, data) {
    try {

      const result = await this.collection.updateMany(selector, {$set: data});
      return { count: result.modifiedCount };
      
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

  /**
   * Finds document which satisfies selector
   * @param {Object} selector target document selector
   * @returns {Object|{error: Object}} found document or error object
   */
  async find(selector) {
    try {
      const result = await this.collection.findOne(selector);
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  /**
   * Removes document which satisfies the selector
   * @param {Object} selector target document selector
   * @returns {RemoveResult} remove result
   */
  async remove(selector) {
    try {

      if(isEmptyObject(selector)) {
        throw new Error('Argument cannot be empty');
      }

      const result = await this.collection.deleteOne(selector);
      return { count: result.deletedCount };

    } catch (e) {
      return { error: e, count: 0 };
    }
  }
}

module.exports = Dao;

/**
 * Used as a return object of remove method
 * @memberof Datastore
 * @typedef {Object} RemoveResult
 * @property {number} count number of documents removed
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of add method
 * @memberof Datastore
 * @typedef {Object} AddResult
 * @property {number} count number of documents successfully added
 * @property {Object} ids set of document ids that were successfully added
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of update method
 * @memberof Datastore
 * @typedef {Object} UpdateResult
 * @property {number} count number of documents updated
 * @property {Object} [error] exception object, only when error occurs
 */