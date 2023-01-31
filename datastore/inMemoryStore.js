import DatastoreStrategy from '../strategy/datastoreStrategy.js';

export default class InMemoryStore extends DatastoreStrategy {
    _creditCardStore = {};

    constructor() {
        super();
        this._creditCardStore = new Map();
    }

    getData() {
        let listAllCard = [];
        this._creditCardStore.forEach((value, key) => {
            let card = {
                name: value.name,
                creditCardNumber: key,
                limit: value._creditCardModel._creditCardNumber,
                balance: value._creditCardModel._balance
            }
            listAllCard.push(card);
        });
        return listAllCard;
    }

    setData(data) {
        if (this.checkIsCardUnique(data._creditCardModel._creditCardNumber)) {
            this._creditCardStore.set(data._creditCardModel._creditCardNumber, data);
            console.log(this._creditCardStore);
        }
    }

    checkIsCardUnique(creditCardNumber) {
        if (this._creditCardStore.has(creditCardNumber)) {
            console.log("This card already exists");
            return false;
        }
        return true;
    }
}
