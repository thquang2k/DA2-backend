const express = require('express');
const router = express.Router();

const roleController = require('../controllers/roleController')

const checkAdmin = require('../middlewares/checkAdmin')

router.get('/', checkAdmin,roleController.getAllRole)
router.post('/create', checkAdmin, roleController.createRole)
router.put('/update/:roleId', checkAdmin, roleController.updateRoleById)
router.delete('/delete/:roleId', checkAdmin, roleController.deleteRoleById)

module.exports = router