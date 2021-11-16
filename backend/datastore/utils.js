module.exports.isEmptyObject = function(obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

module.exports.getInsertedIds = function(error) {
  const { insertedIds } = error.result;
  const failedIds = error.writeErrors.map((val) => { return val.err.op._id });

  const actualInsertedIds = Object.keys(insertedIds)
  .filter(key => {
    return !failedIds.includes(insertedIds[key]);
  })
  .reduce((result, key) => {
    result[key] = insertedIds[key];
    return result;
  }, {});

  return actualInsertedIds;
}

module.exports.defaultFindOptions = {
  findOne: true
}

// module.exports.sanitizeInsertDocs = function(docs, requiredFields) {
//   docs = docs.filter(doc => {
//     for (field in requiredFields) {
//       if (doc[])
//     }
//     return "tag" in doc && "email" in doc && "discordTag" in doc;
//   })
//   .map(doc => {
//     const { tag, email, discordTag } = doc;
//     return { tag, email, discordTag };
//   });

//   if (isEmptyObject(docs)) {
//     throw new Error("Invalid argument for User.add()");
//   }
// }