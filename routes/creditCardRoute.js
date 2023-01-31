import express from 'express';
import {addCardData, listCardData} from '../controller/creditCardController.js';

const router = express.Router();

router
    .route('/add_card')
    .post((req, res) => addCardData(req, res));

router
    .route('/list_cards')
    .get((req, res) => listCardData(req, res));

export default router;
