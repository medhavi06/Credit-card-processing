import chai from 'chai';
import chaiHttp from 'chai-http';
import CreditCardModel from '../model/creditCardModel.js';
import app from '../app.js';
import InMemoryStore from '../datastore/inMemoryStore.js';
import Customer from '../model/customer.js';

process.env.NODE_ENV = 'test';

const { expect } = chai;
chai.use(chaiHttp);
describe('Input Validation tests', () => {
  describe('Validate name', () => {
    it('should validate the name', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob06', card_number: '4012888888881881', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should validate the name', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob-', card_number: '4012888888881881', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should validate the name', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'bob kumar verma', card_number: '4012888888881881', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should validate the name', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '5454545454545454', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Validate card number', () => {
    it('should validate the card number: success case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '4111111111111111', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should validate the card number : success case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '5105105105105100', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should validate the card number: already exist: failure case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'bob kumar verma', card_number: '5454545454545454', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should validate the card number: invalid: failure case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '123', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
    it('should validate the card number: invalid: failure case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '123abc', limit: 10 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Validate limit', () => {
    it('should validate the limit : success case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob', card_number: '5555555555554444', limit: 100 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should validate the limit: failure case', (done) => {
      chai.request(app)
        .post('/api/v1/add_card')
        .send({ name: 'Bob-', card_number: '5555555555554444', limit: null })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});

describe('DB tests', () => {
  describe('with number arguments', () => {
    it('should return sum of arguments', (done) => {
      const storeDB = new InMemoryStore();
      let creditCard = new CreditCardModel(1000, '378282246310005');
      let customer = new Customer('Bob', creditCard);
      storeDB.setData(customer);
      creditCard = new CreditCardModel(9800, '371449635398431');
      customer = new Customer('Marley', creditCard);
      storeDB.setData(customer);
      expect(storeDB.getData().length).to.equal(2);
      done();
    });
  });
});
