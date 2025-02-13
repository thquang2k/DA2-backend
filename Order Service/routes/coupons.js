var express = require('express');
var router = express.Router();

const couponController = require('../controllers/couponController')

router.get('/', couponController.getAllCoupon)
router.get('/:couponId', couponController.getCouponById)
router.post('/create', couponController.createCoupon)
router.put('/update/:couponId', couponController.updateCouponByCode)
router.delete('/delete/:couponId', couponController.deleteCouponById)

module.exports = router;
