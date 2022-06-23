
const { default: mongoose } = require('mongoose')
const Artist = require('../models/Artist')
const Section= require('../models/Section')
const Song = require('../models/Song')

class PageController { 

   async home(req,res){
        const  a= await Section.aggregate()
                                .lookup({ from: 'albums', localField: 'sectionId', foreignField: 'sectionId', as: 'albums' })
        res.json(a)
   }
   async search(req,res){
      const artId=[];
      const songss=[];
      const artist=[]
     const value=new RegExp(req.params.value,'i')
     const songs = await Song.find({songName:value})
     if(songs!=[]){
      songs.forEach(async (song,index)=>{
          const cbArtId=song.combinedArt
          const mArtId =song.mainArt
         //  const combinedArt=await Artist.aggregate().match({artistId: {$in:cbArtId} })
         //                                            .project({ _id:0 })
          let mainArtist=await Artist.findOne({artistId:mArtId})
          mainArtist=[mainArtist]
          const {songName,songId,slug,release,poster,audio,lyric}=song
          songss.push({songName,songId,slug,release,poster,audio,lyric,mainArtist})
          console.log(songConvert)
      }) 
   }

   else {

   }
     const artists = await Artist.find({artistName:value})
     res.json({
        songs:songss,
        artists
     })
     
 }

}

module.exports = new PageController;