export default class CreditCardModel {
    _limit;
    _creditCardNumber;

    constructor(limit, creditCardNumber) {
        this._limit = limit;
        this._creditCardNumber = creditCardNumber;
    }

    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    get creditCardNumber() {
        return this._creditCardNumber;
    }

    set creditCardNumber(value) {
        this._creditCardNumber = value;
    }
}
