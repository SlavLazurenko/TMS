const Datastore = require("./datastoreold.js");

async function main() {

  let result = await Datastore.user.find({});
  // let result = await Datastore.user.delete({tag: "NewUser#4"});
  // let result = await Datastore.user.update({tag: "Eventski596"}, {email: 'theeventski@ghotmail.com'});
  // let result = await Datastore.user.add(
  // {
  //   tag: "NewUser#2", 
  //   email: "second@email.com", 
  //   discordTag: "second"
  // },
  // {
  //   tag: "NewUser#3", 
  //   email: "third@email.com", 
  //   discordTag: "none"
  // },
  // {
  //   tag: "NewUser#4", 
  //   email: "fourth@email.com", 
  //   discordTag: "fourth"
  // }
  // );

  console.log(result);
}


main();
