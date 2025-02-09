var express = require('express');
var router = express.Router();

const brandController = require('../controllers/brandController')

router.get('/', brandController.getAllBrand)
router.get('/:brandId', brandController.getBrandById)
router.post('/create', brandController.createBrand)
router.put('/update/:brandId', brandController.updateBrandById)
router.delete('/delete/:brandId', brandController.deleteBrandById)

module.exports = router;
