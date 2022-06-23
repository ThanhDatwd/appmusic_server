const express = require('express');
const router = express.Router();
const artistController = require('../controllers/ArtistController');


router.get('/:name',artistController.show)
router.post('/',artistController.create)
router.get('/',artistController.index)
module.exports = router