var express = require('express');
var router = express.Router();

const originController = require('../controllers/originController')

router.get('/', originController.getAllOrigin)
router.get('/:originId', originController.getOriginById)
router.post('/create', originController.createOrigin)
router.put('/update/:originId', originController.updateOriginById)
router.delete('/delete/:originId', originController.deleteOriginById)

module.exports = router;
