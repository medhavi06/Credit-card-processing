import DatastoreStrategy from '../strategy/datastoreStrategy.js';

export default class InMemoryStore extends DatastoreStrategy {
    _creditCardStore = {};
    _creditCardNumberSet = [];

    constructor() {
        super();
        this._creditCardStore = new Map();
        this._creditCardNumberSet = new Set();
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
            this._creditCardNumberSet.add(this.formatCreditCard(data._creditCardModel._creditCardNumber));
        }
    }

    checkIsCardUnique(creditCardNumber) {
        return !this._creditCardNumberSet.has(this.formatCreditCard(creditCardNumber));

    }

    formatCreditCard(creditCardNumber) {
        creditCardNumber = creditCardNumber.replaceAll("-", "").replaceAll(" ", "");
        return creditCardNumber
    }
}
