const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

//router Object
const router = express.Router()

// GET all users || GET
router.get('/all-users', getAllUsers)

// Create user || POST
router.post('/register', registerController)

// LOGIN || POST
router.post('/login', loginController)

module.exports = router;
