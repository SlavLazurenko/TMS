const express = require('express');
const app = express();
const port = 3001;

const Datastore = require('../backend/datastore')

app.use(express.json())


app.get('/get-message', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	let count = Math.floor(Math.random() * 100 + 1);
  res.send(`${count} units`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/registerUser", (req, res) => {

    // async function createAccount(data){
    //   await Datastore.init()

    //   let result

    //   result = await Datastore.account.add(data)
    //   console.log(result)
    // }

    // createAccount(req.body)
    res.send(console.log(req.body))
    // console.log(req.body)
    // console.log(res.status)

    
})

