const { isEmptyObject, getInsertedIds, defaultFindOptions } = require("../utils.js");

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
   * @returns {Datastore.AddResult} add result
   * @pre self.docs->forAll(doc|!find()->includes(doc))
   * @post self.docs->forAll(doc|find()->includes(doc))
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
   * @returns {Datastore.UpdateResult} update operation result
   * @pre find(self.selector).error = null
   * @post find(self.selector)->includes(data)
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
   * @param {FindOptions} [options] regulates format of returned document
   * @returns {Object|Object[]|{error: Object}} found document or error object
   * @pre collection->size() > 0
   * @pre collection->exists(doc|doc->includes(selector))
   */
  async find(selector, options = defaultFindOptions) {
    try {
      let result;
      if (options.findOne)
        result = await this.collection.findOne(selector);
      else
        result = await this.collection.find(selector).toArray();
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  /**
   * Removes document which satisfies the selector
   * @param {Object} selector target document selector
   * @returns {Datastore.RemoveResult} remove result
   * @pre find(selector).error = null
   * @post find(selector).error != null
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
 * Used to customize return values for find operations
 * @typedef {Object} FindOptions
 * @memberof Datastore
 * @property {boolean} [findOne=true] returns first found document, array otherwise
 */

/**
 * Used as a return object of remove method
 * @typedef {Object} RemoveResult
 * @memberof Datastore
 * @property {number} count number of documents removed
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of add method
 * @typedef {Object} AddResult
 * @memberof Datastore
 * @property {number} count number of documents successfully added
 * @property {Object} ids set of document ids that were successfully added
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of update method
 * @typedef {Object} UpdateResult
 * @memberof Datastore
 * @property {number} count number of documents updated
 * @property {Object} [error] exception object, only when error occurs
 */
