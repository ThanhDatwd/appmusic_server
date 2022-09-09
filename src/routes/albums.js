const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/AlbumController');


router.get('/:name',AlbumController.show)
router.get('/',AlbumController.index)
router.post('/many',AlbumController.getMany)
router.post('/',AlbumController.create)
router.put('/:id',AlbumController.updateAlbum)
module.exports = router