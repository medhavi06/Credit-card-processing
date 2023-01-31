export const addCardData = (req, res) => {
  req.app.get('dbObject').setData(req.body);
  res.send('adding a credit card');
};

export const listCardData = (req, res) => {
  req.app.get('dbObject').getData();
  res.send('retrieving all the credit cards');
};
