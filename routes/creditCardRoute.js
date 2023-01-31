const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/add_card', (req, res) => {
    res.send('adding a credit card');
});

module.exports = router;
