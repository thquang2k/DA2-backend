var express = require('express');
var router = express.Router();

const vnpController = require('../controllers/vnpController')

router.post('/create_payment_url', vnpController.createPaymentUrl);

router.get('/vnpay_return', vnpController.vnpReturn);

router.get('/vnpay_ipn', vnpController.vnpIpn);

module.exports = router;
