const express = require('express')
const router = express.Router()
const usersController = require('../controllers/UsersController')

//--------------------------------------------------------------------------
//userController
//--------------------------------------------------------------------------
router.get('/all', usersController.getAllUser)
router.get('/find/:address', usersController.getUserByAddress)
router.post('/new', usersController.registerNewUser)
//--------------------------------------------------------------------------

module.exports = router