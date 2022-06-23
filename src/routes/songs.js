const express = require('express');
const router = express.Router();
const songController = require('../controllers/SongController');
const {cloudinary}=require('../utils/cloudinary')


router.get('/', songController.index)
router.post('/',songController.create)
router.post('/many',songController.getMany)
router.put('/:id',songController.update)

router.post('/upload',async(req,res)=>{
            
     try {
            const fileStr = req.body.image
            const uploadReponse = await cloudinary.uploader.upload(fileStr,{upload_preset:'ml_default'})
            res.json({mes:200,
                      file:uploadReponse   
                     })
                     
        } catch (error) {
            res.status(500).json({err:'somthing wrong'})
        } 
})
router.get('/:name',songController.show)
module.exports = router