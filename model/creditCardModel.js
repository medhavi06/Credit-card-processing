export default class CreditCardModel {
    _balance;

    constructor(limit, creditCardNumber) {
        this._limit = limit;
        this._balance = 0;
        this._creditCardNumber = creditCardNumber;
    }

    _limit;

    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    _creditCardNumber;

    get creditCardNumber() {
        return this._creditCardNumber;
    }

    set creditCardNumber(value) {
        this._creditCardNumber = value;
    }
}
