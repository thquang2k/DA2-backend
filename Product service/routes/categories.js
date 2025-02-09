var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getAllCategory)
router.get('/:categoryId', categoryController.getCategoryById)
router.post('/create', categoryController.createCategory)
router.put('/update/:categoryId', categoryController.updateCategoryById)
router.delete('/delete/:categoryId', categoryController.deleteCategoryById)

module.exports = router;
