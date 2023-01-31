const datastoreStrategy = require('../strategy/datastoreStategy')

class InMemoryStore extends datastoreStrategy {
    //define get n save
    getData() {
       //logic to get data
        console.log("Printing  : !!!!!");
    }
    setData(data) {
        console.log("Printing data : !!!!!");
        console.log(data);
    }
}
module.export = InMemoryStore;
