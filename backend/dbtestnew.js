const Datastore = require("./datastore");

async function user() {
  await Datastore.init();

  // let result = await Datastore.user.add(
  //   {
  //     tag: "NewUser#2", 
  //     email: "second@email.com", 
  //     discordTag: "second"
  //   },
  //   {
  //     tag: "NewUser#3", 
  //     email: "third@email.com", 
  //     discordTag: "none"
  //   },
  //   {
  //     tag: "NewUser#4", 
  //     email: "fourth@email.com", 
  //     discordTag: "fourth"
  //   }
  // );

  // let result = await Datastore.user.update({tag: "Testuser"}, {discordTag: `testuser#${Math.round(Math.random() * 10000)}`});

  // let result = await Datastore.user.find({tag: "Testuser"});

  // let result = await Datastore.user.remove({tag: "NewUser#2"});



  console.log(result);
}

user();