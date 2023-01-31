import Customer from "../model/customer.js";
import CreditCardModel from "../model/creditCardModel.js";

export const addCardData = (req, res) => {
    const dbObject = req.app.get('dbObject')
    console.log(req.body);
    let creditCard = new CreditCardModel(req.body.limit, req.body.card_number);
    let customer = new Customer(req.body.name, creditCard);
    dbObject.setData(customer);
    return res.send('adding a credit card');
};

export const listCardData = (req, res) => {
    const dbObject = req.app.get('dbObject');
    let cardList = dbObject.getData();
    return res.json(cardList).status(200);
};
