var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')
const variantController = require('../controllers/variantController')

router.get('/', productController.getAllProduct)
router.get('/detail/:productId', productController.getProductById)
router.post('/add', productController.addProduct)
router.delete('/delete/:productId', productController.removeProductById)

router.get('/laptop', productController.getAllLaptop)
router.get('/laptop/detail/:productId', productController.getLaptopById)
router.get('/laptop/detail/:productId/variant', variantController.getAllLaptopVariantsByProductId)
router.post('/laptop/detail/:productId/variant/add', variantController.createLaptopVariant)
router.post('/laptop/add',  productController.addLaptop)
router.put('/laptop/update/:productId', productController.updateLaptopById)
router.put('/laptop/detail/:productId/variant/update/:variantId', variantController.updateLaptopVariantById)
router.delete('/laptop/delete/:productId', productController.removeLaptopById)
router.delete('/laptop/detail/:productId/variant/delete/:variantId', variantController.deleteLaptopVariantById)

router.get('/cellphone', productController.getAllCellphone)
router.get('/cellphone/detail/:productId', productController.getCellphoneById)
router.get('/cellphone/detail/:productId/variant', variantController.getAllCellphoneVariantsByProductId)
router.post('/cellphone/detail/:productId/variant/add', variantController.createCellphoneVariant)
router.post('/cellphone/add', productController.addCellphone)
router.put('/cellphone/update/:productId', productController.updateCellphoneById)
router.put('/cellphone/detail/:productId/variant/update/:variantId', variantController.updateCellphoneVariantById)
router.delete('/cellphone/delete/:productId', productController.removeCellphoneById)
router.delete('/cellphone/detail/:productId/variant/delete/:variantId', variantController.deleteCellphoneVariantById)

module.exports = router;
