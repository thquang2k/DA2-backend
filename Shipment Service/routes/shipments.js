var express = require('express');
var router = express.Router();

const shipmentController = require('../controllers/shipmentController')

router.get('/', shipmentController.getAllShipment)
router.get('/:shipmentId', shipmentController.getShipmentById)
router.post('/create', shipmentController.createShipment)
router.put('/update/:shipmentId', shipmentController.updateShipmentById)
router.delete('/delete/:shipmentId', shipmentController.deleteShipmentById)

module.exports = router;
