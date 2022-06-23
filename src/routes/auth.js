const express = require('express');
const router = express.Router();
const authController= require('../controllers/AuthController');
const middlewareController = require('../controllers/MiddlewareController');


router.post('/register',authController.registerUser)
router.post('/login',  authController.loginUser)

module.exports = router