const express = require('express');
const router = express.Router();

const addressController = require('../controllers/addressController')
const checkAdmin = require('../middlewares/checkAdmin')
const getCurrentUser = require('../middlewares/getCurrentUser')

router.get('/all', checkAdmin, addressController.getAllAddress)
router.get('/', getCurrentUser, addressController.getAddressCurrentUser)
router.get('/user/:userId', checkAdmin, addressController.getAddressByUserId)
router.get('/get/:addressId', addressController.getAddressById)
router.post('/create', getCurrentUser, addressController.createAddress)
router.put('/update/:addressId', getCurrentUser, addressController.updateAddressById)
router.delete('/delete/:addressId', getCurrentUser, addressController.deleteAddressById)

module.exports = router