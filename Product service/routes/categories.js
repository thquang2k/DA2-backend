var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController')

const checkMaster = require('../middlewares/checkMaster')

router.get('/', categoryController.getAllCategory)
router.get('/:categoryId', categoryController.getCategoryById)
router.post('/create',checkMaster, categoryController.createCategory)
router.put('/update/:categoryId',checkMaster.apply, categoryController.updateCategoryById)
router.delete('/delete/:categoryId',checkMaster, categoryController.deleteCategoryById)

module.exports = router;
