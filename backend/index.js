const app = require("./server")
const Datastore = require('./datastore');
const port = 3001;

Datastore.init()
.then(res => {
    if (res) {

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
      });
}
    else{
        console.log("Error: Backend not connected.");
    }})

