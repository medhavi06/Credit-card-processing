import creditCardModel from "./creditCardModel";

class Customer {
    _creditCardModel;
    _name;

    constructor(name) {
        this._name = name;
        this._creditCardModel = new creditCardModel();
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
