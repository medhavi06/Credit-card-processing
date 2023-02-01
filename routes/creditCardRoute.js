import express from 'express';
import {addCardData, listCardData} from '../controller/creditCardController.js';
import {body, validationResult} from "express-validator";
import valid_credit_card from "../validator/lunhCheckAlgorithm.js";

const router = express.Router();

router
    .route('/add_card')
    .post(
        // Validations on request parameters
        body('card_number').isLength({max: 19}).withMessage('Card number length must be less than 20'),
        body('limit').trim().notEmpty().isNumeric().withMessage('Limit must be numeric and non empty'),
        body('name').trim().notEmpty().isAlpha(undefined, {ignore: ' '})
            .withMessage('Name must not be null and should only contain alphabets and whitespace'),
        body('card_number').custom((value, {req}) => {
            // Lunh10 validation on Card number
            if (!valid_credit_card(value)) {
                throw new Error('Card number is not valid');
            }
            // Check if card number already exists in DB
            if (!req.app.get('dbObject').getStrategy().checkIsCardUnique(value)) {
                throw new Error('Card number already exists, add new card');
            }
            return true;
        }),
        (req, res) => {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            addCardData(req, res)
        }
    );

router
    .route('/list_cards')
    .get((req, res) => listCardData(req, res));

export default router;
