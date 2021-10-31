isEmptyObject = function(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

class UserDao {
  constructor(db) {
    this.collection = db.collection("users");
  }
  
  async add(...docs) {
    try {

      //VALIDATE INPUT
      docs = docs.filter(doc => {
        return "tag" in doc && "email" in doc && "discordTag" in doc;
      })
      .map(doc => {
        const { tag, email, discordTag } = doc;
        return {tag, email, discordTag};
      });

      if (isEmptyObject(docs)) {
        throw new Error("Invalid agrument for User.add()");
      }

      //EXECUTE
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
      return { error: e };
    }
  }

  async find(selector) {
    try {
      const result = await this.collection.findOne(selector);
      return result;
    } catch (e) {
      return { error: e };
    }
  }

  async remove(selector) {
    try {
      if(isEmptyObject(selector)) {
        throw new Error('Argument for User.remove() cannot be empty');
      }
      const result = await this.collection.deleteOne(selector);
      return { count: result.deletedCount };
    } catch (e) {
      return { error: e };
    }
  }
}

module.exports = UserDao;