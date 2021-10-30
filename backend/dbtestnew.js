const Datastore = require("./datastore");

async function main() {
  await Datastore.init();

  let result = await Datastore.user.add(    
    {
      tag: "NewUser#2", 
      email: "second@email.com", 
      discordTag: "second"
    },
    {
      tag: "NewUser#3", 
      email: "third@email.com", 
      discordTag: "none"
    },
    {
      tag: "NewUser#4", 
      email: "fourth@email.com", 
      discordTag: "fourth"
    }
  );

  console.log(result);
}

main();