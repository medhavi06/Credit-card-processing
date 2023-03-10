import Customer from '../model/customer.js';
import CreditCardModel from '../model/creditCardModel.js';

export const addCardData = (req, res) => {
  const dbObject = req.app.get('dbObject');
  const creditCard = new CreditCardModel(req.body.limit, req.body.card_number);
  const customer = new Customer(req.body.name, creditCard);
  dbObject.setData(customer);
  return res.json({ msg: 'credit card added successfully' }).status(200);
};

export const listCardData = (req, res) => {
  const dbObject = req.app.get('dbObject');
  const cardList = dbObject.getData();
  return res.json(cardList).status(200);
};
