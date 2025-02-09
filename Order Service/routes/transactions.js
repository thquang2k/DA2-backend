var express = require('express');
var router = express.Router();

const transactionController = require('../controllers/transactionController')

router.get('/all', transactionController.getAllTransaction)
router.get('/:transactionId', transactionController.getTransactionById)
router.get('/', transactionController.getTransactionCurrentUser)

module.exports = router;
