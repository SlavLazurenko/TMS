class UserDao {
  constructor(db) {
    this.collection = db.collection("users");
  }
  
  async add(...docs) {
    try {

      //VALIDATE INPUT
      docs = docs.filter((doc) => {
        return "tag" in doc && "email" in doc && "discordTag" in doc;
      })
      .map((doc) => {
        const { tag, email, discordTag } = doc;
        return {tag, email, discordTag};
      });

      //EXECUTE
      const result = await this.collection.insertMany(docs, {ordered: false});

      return { count: result.insertedCount, ids: result.insertedIds };

    } catch (e) {
      const { nInserted, insertedIds } = e.result;
      const failedIds = e.writeErrors.map((val) => { return val.err.op._id });

      //FILTER IDS THAT WERE SUCCESSFULLY INSERTED
      const actualInsertedIds = Object.keys(insertedIds)
        .filter(function(key){
          return !failedIds.includes(insertedIds[key]);
        })
        .reduce(function (result, key){
          result[key] = insertedIds[key];
          return result;
        }, {});
      
      return { error: e, count: nInserted, ids: actualInsertedIds };
    }
  }
}

module.exports = UserDao;