import DatastoreStrategy from '../strategy/datastoreStrategy.js';

export default class InMemoryStore extends DatastoreStrategy {
    _creditCardStore = {};
    _creditCardStoreFormatted = [];

    constructor() {
        super();
        this._creditCardStore = new Map();
        this._creditCardStoreFormatted = new Set();
    }

    getData() {
        let listAllCard = [];
        this._creditCardStore.forEach((value, key) => {
            let card = {
                name: value.name,
                creditCardNumber: key,
                limit: value._creditCardModel._limit,
                balance: value._creditCardModel._balance
            }
            listAllCard.push(card);
        });
        return listAllCard;
    }

    setData(data) {
        if (this.checkIsCardUnique(data._creditCardModel._creditCardNumber)) {
            this._creditCardStore.set(data._creditCardModel._creditCardNumber, data);
            this._creditCardStoreFormatted.add(this.formatCreditCard(data._creditCardModel._creditCardNumber));
            console.log(this._creditCardStore);
        }
    }

    checkIsCardUnique(creditCardNumber) {
        if (this._creditCardStoreFormatted.has(this.formatCreditCard(creditCardNumber))) {
            console.log("This card already exists");
            return false;
        }
        return true;
    }

    formatCreditCard(creditCardNumber) {
        creditCardNumber = creditCardNumber.replaceAll("-", "").replaceAll(" ", "");
        return creditCardNumber
    }
}
