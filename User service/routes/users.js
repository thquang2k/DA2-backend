const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const checkAdmin = require('../middlewares/checkAdmin')
const getCurrentUser = require('../middlewares/getCurrentUser')

router.get('/', checkAdmin, userController.getAllUser)
router.get('/get/:userId', checkAdmin, userController.getUserById)
router.get('/login/check', userController.checkLoginByToken)
router.get('/fetch', getCurrentUser, userController.fetchUserData)
router.post('/create', userController.createUser)
router.post('/login/account/', userController.loginByAccount)
router.put('/put/:userId', checkAdmin, userController.updateUserById)
router.put('/update', getCurrentUser, userController.updateCurrentUser)
router.delete('/delete/:userId', checkAdmin, userController.deleteUserById)

module.exports = router