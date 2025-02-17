var express = require('express');
var router = express.Router();

const promotionController = require('../controllers/promotionController')

const checkStaff = require('../middlewares/checkStaff')
const checkMaster = require('../middlewares/checkMaster')

router.get('/', promotionController.getAllPromotion)
router.get('/:promotionId', promotionController.getPromotionById)
router.post('/create', checkStaff, promotionController.createPromotion)
router.put('/update/:promotionId', checkStaff, promotionController.updatePromotionById)
router.delete('/delete/:promotionId',checkMaster,promotionController.deletePromotionById)

module.exports = router;
