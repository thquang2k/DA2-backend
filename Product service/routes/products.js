var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')
const variantController = require('../controllers/variantController')

const checkStaff = require('../middlewares/checkStaff')
const checkMaster = require('../middlewares/checkMaster')

router.get('/', productController.getAllProduct)
router.get('/detail/:productId', productController.getProductById)
router.post('/add', checkStaff, productController.addProduct)
router.delete('/delete/:productId', checkMaster,productController.removeProductById)

router.get('/laptop', productController.getAllLaptop)
router.get('/laptop/detail/:productId', productController.getLaptopById)
router.get('/laptop/detail/:productId/variant', variantController.getAllLaptopVariantsByProductId)
router.post('/laptop/detail/:productId/variant/add', checkStaff, variantController.createLaptopVariant)
router.post('/laptop/add',  checkStaff, productController.addLaptop)
router.put('/laptop/update/:productId', checkStaff, productController.updateLaptopById)
router.put('/laptop/detail/:productId/variant/update/:variantId', checkStaff, variantController.updateLaptopVariantById)
router.delete('/laptop/delete/:productId', checkMaster,productController.removeLaptopById)
router.delete('/laptop/detail/:productId/variant/delete/:variantId', checkMaster, variantController.deleteLaptopVariantById)

router.get('/cellphone', productController.getAllCellphone)
router.get('/cellphone/detail/:productId', productController.getCellphoneById)
router.get('/cellphone/detail/:productId/variant', variantController.getAllCellphoneVariantsByProductId)
router.post('/cellphone/detail/:productId/variant/add', checkStaff, variantController.createCellphoneVariant)
router.post('/cellphone/add', checkStaff, productController.addCellphone)
router.put('/cellphone/update/:productId', checkStaff, productController.updateCellphoneById)
router.put('/cellphone/detail/:productId/variant/update/:variantId', checkStaff, variantController.updateCellphoneVariantById)
router.delete('/cellphone/delete/:productId', checkMaster, productController.removeCellphoneById)
router.delete('/cellphone/detail/:productId/variant/delete/:variantId', checkMaster,variantController.deleteCellphoneVariantById)

router.put('/variant/update/:variantId/:method/:quantity', variantController.updateVariantStock)

module.exports = router;
