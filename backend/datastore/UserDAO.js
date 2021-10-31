/**
 * Class for communicating with users collection in MongoDB
 */
class UserDao {
  constructor(db) {
    /**
     * MongoDB users collection reference 
     * @type {Collection}
     * @private
     */
    this.collection = db.collection("users");
  }
  
  /**
   * Adds new documents
   * @param  {...UserData} docs user documents to be added
   * @returns {UserAddResult} add result
   */
  async add(...docs) {
    try {

      docs = docs.filter(doc => {
        return "tag" in doc && "email" in doc && "discordTag" in doc;
      })
      .map(doc => {
        const { tag, email, discordTag } = doc;
        return {tag, email, discordTag};
      });

      if (isEmptyObject(docs)) {
        throw new Error("Invalid argument for User.add()");
      }

      const result = await this.collection.insertMany(docs, {ordered: false});
      return { count: result.insertedCount, ids: result.insertedIds };

    } catch (e) {
      if (e.result) {
        const { nInserted, insertedIds } = e.result;
        const failedIds = e.writeErrors.map((val) => { return val.err.op._id });

        //FILTER IDS THAT WERE SUCCESSFULLY INSERTED
        const actualInsertedIds = Object.keys(insertedIds)
          .filter(key => {
            return !failedIds.includes(insertedIds[key]);
          })
          .reduce((result, key) => {
            result[key] = insertedIds[key];
            return result;
          }, {});
        
        return { error: e, count: nInserted, ids: actualInsertedIds };
      }

      return { error: e };
    }
  }

  /**
   * Updates document that satisfies selector with specified data
   * @param {UserSelector} selector target document selector
   * @param {Object} data key value pairs which define modifications
   * @returns {UserUpdateResult} update operation result
   */
  async update(selector, data) {
    try {

      data = Object.keys(data)
      .filter(key => {
        return key == "tag" || key == "discordTag" || key == "email";
      })
      .reduce((result, key) => {
        result[key] = data[key];
        return result;
      }, {});

      const result = await this.collection.updateMany(selector, {$set: data});
      return { count: result.modifiedCount };
      
    } catch (e) {
      return { error: e, count: 0 };
    }
  }

  /**
   * Finds documents which satisfy selector
   * @param {UserSelector} selector target document selector
   * @returns {UserData|{error: Object}} found document or error object
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
   * @param {UserSelector} selector target document selector
   * @returns {UserRemoveResult} remove result
   */
  async remove(selector) {
    try {

      if(isEmptyObject(selector)) {
        throw new Error('Argument for User.remove() cannot be empty');
      }

      const result = await this.collection.deleteOne(selector);
      return { count: result.deletedCount };

    } catch (e) {
      return { error: e, count: 0 };
    }
  }
}

module.exports = UserDao;


isEmptyObject = function(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

/**
 * Used to specify target document in users collection to execute different operations against
 * @typedef {Object} UserSelector
 * @property {string} [tag] to match the document with tag
 * @property {string} [discordTag] to match the document with discordTag
 * @property {string} [email] to match the document with email
 */

/**
 * User data structure
 * @typedef {Object} UserData
 * @property {ObjectId} [_id] BSON document identifier for MongoDB 
 * @property {string} tag username - main identifier of the user
 * @property {string} discordTag user's discord tag
 * @property {string} email user's email address
 */

/**
 * Used as a return object of remove method
 * @typedef {Object} UserRemoveResult
 * @property {number} count number of documents removed
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of add method
 * @typedef {Object} UserAddResult
 * @property {number} count number of documents successfully added
 * @property {Object} ids set of document ids that were successfully added
 * @property {Object} [error] exception object, only when error occurs
 */

/**
 * Used as a return object of update method
 * @typedef {Object} UserUpdateResult
 * @property {number} count number of documents updated
 * @property {Object} [error] exception object, only when error occurs
 */