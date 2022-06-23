const express = require('express');
const router = express.Router();
const userController =require('../controllers/UserController')
const middlewareController = require('../controllers/MiddlewareController');


router.post('/info', middlewareController.verifyToken, userController.getUser)
router.put('/update', middlewareController.verifyToken, userController.updateUser)
router.get('/favorite', middlewareController.verifyToken, userController.getFavorite)
router.get('/libary', middlewareController.verifyToken, userController.getLibary)

module.exports = router