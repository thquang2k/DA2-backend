var express = require('express');
var router = express.Router();

const brandController = require('../controllers/brandController')
const checkStaff = require('../middlewares/checkStaff')
const checkMaster = require('../middlewares/checkMaster')

router.get('/', brandController.getAllBrand)
router.get('/:brandId', brandController.getBrandById)
router.post('/create', checkStaff,brandController.createBrand)
router.put('/update/:brandId', checkStaff,brandController.updateBrandById)
router.delete('/delete/:brandId', checkMaster, brandController.deleteBrandById)

module.exports = router;
