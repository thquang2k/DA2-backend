var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cartController')

const fetchCurrentUser = require('../middlewares/fetchCurrentUser')

router.get('/',fetchCurrentUser, cartController.getCurrentUserCart)
router.post('/create', cartController.createCart)
router.delete('/delete', cartController.removeCart)
router.post('/add/:variantId', fetchCurrentUser, cartController.addToCart)
router.delete('/remove/:variantId', fetchCurrentUser, cartController.removeFromCartByVariantId)
module.exports = router;
