import DatastoreStrategy from '../strategy/datastoreStrategy.js';

class InMemoryStore extends DatastoreStrategy {
    _creditCardStore = {};

    constructor() {
        super();
        this._creditCardStore = new Map();
    }

    getData() {
        // logic to get data
    }

    setData(data) {

    }
}

export default InMemoryStore;
