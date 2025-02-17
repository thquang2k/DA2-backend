var express = require('express');
var router = express.Router();

const originController = require('../controllers/originController')
const checkStaff = require('../middlewares/checkStaff')
const checkMaster = require('../middlewares/checkMaster')

router.get('/', originController.getAllOrigin)
router.get('/:originId', originController.getOriginById)
router.post('/create', checkStaff, originController.createOrigin)
router.put('/update/:originId', checkStaff, originController.updateOriginById)
router.delete('/delete/:originId', checkMaster, originController.deleteOriginById)

module.exports = router;
