const express = require('express');
const router = express.Router();
const artistController = require('../controllers/ArtistController');


router.get('/:name',artistController.show)
router.post('/many',artistController.getMany)
router.post('/',artistController.create)
router.get('/',artistController.index)
router.put('/:id',artistController.updateArtist)
module.exports = router