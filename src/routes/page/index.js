const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/PageController');


router.get('/home',pageController.home)
router.get('/search/:value',pageController.search)
module.exports = router