var express = require('express');
var router = express.Router();

const colorController = require('../controllers/colorController')

router.get('/', colorController.getAllColor)
router.get('/:colorId', colorController.getColorById)
router.post('/create', colorController.createColor)
router.put('/update/:colorId', colorController.updateColorById)
router.delete('/delete/:colorId', colorController.deleteColorById)

module.exports = router;
