var express = require('express');
var router = express.Router();

const promotionController = require('../controllers/promotionController')

router.get('/', promotionController.getAllPromotion)
router.get('/:promotionId', promotionController.getPromotionById)
router.post('/create', promotionController.createPromotion)
router.put('/update/:promotionId', promotionController.updatePromotionById)
router.delete('/delete/:promotionId',promotionController.deletePromotionById)

module.exports = router;
