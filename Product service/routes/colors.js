var express = require('express');
var router = express.Router();

const colorController = require('../controllers/colorController')
const checkStaff = require('../middlewares/checkStaff')
const checkMaster = require('../middlewares/checkMaster')

router.get('/', colorController.getAllColor)
router.get('/:colorId', colorController.getColorById)
router.post('/create', checkStaff, colorController.createColor)
router.put('/update/:colorId', checkStaff, colorController.updateColorById)
router.delete('/delete/:colorId', checkMaster, colorController.deleteColorById)

module.exports = router;
