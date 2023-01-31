export default class Customer {
    _creditCardModel;
    _name;

    constructor(name, creditCardModel) {
        this._name = name;
        this._creditCardModel = creditCardModel;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get creditCardModel() {
        return this._creditCardModel;
    }

    set creditCardModel(value) {
        this._creditCardModel = value;
    }

}
