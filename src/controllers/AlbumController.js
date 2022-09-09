


const Album = require('../models/Album')
const Song = require('../models/Song')
const Artist = require('../models/Artist')
class AlbumController {
    async index(req, res, next) {
        let albums = await Album.aggregate(
            [
                {
                    "$lookup": {
                        from: "songs",
                        localField: "_id",
                        foreignField: "albumId",
                        as: "songs"
                    }
                }
            ]
        )
        res.send(albums)
    }
    async getMany(req, res){
        const playlistId = req.body.data
        let albums = await Album.aggregate()
                                .match({albumId: {$in:playlistId}})
        res.json(albums)
    }
    create(req, res, next) {
        try {
            Album.create({
                albumName: req.body.data.name,
                thumbnail: req.body.data.thumbnail||'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp%E2%80%A6over/a/d/9/5/ad9598b685c82fa9441041c24fa8040a.jpg',
                preface:   req.body.data.preface||'',
                isPuclic : req.body.data.isPuclic||true,
                isRandom : req.body.data.isRandom||true,
                byUser   : req.body.data.userId||'',
                byAdmin  : req.body.data.byAdmin||false,
                songsId   : req.body.data.songId||[]
            })
            res.json({
                message:'success'
            })
        } catch (error) {
            res.status(500).json({ err: 'somthing wrong' })
        }
    }
    async show(req, res, next) {
        try {
            const artId=[];
            const songss=[];
            const artists=[]
            const a=[]
            const album = await Album.findOne({ albumSlug: req.params.name })
            const songId = album.songId
            const songs = await Song.aggregate()
                                   .match({ songId: { $in: songId } })
                                   .lookup({ from: 'artists', localField: 'mainArt', foreignField: 'artistId', as: 'mainArtist' });
            const {albumId,albumName,thumbnail,preface,albumSlug,like,updatedAt}=album
            if(songs!=[]){
               songs.forEach(async (song,index)=>{
                   const cbArtId=song.combinedArt
                   artId.push(song.mainArt,cbArtId.join(','))
                   const combinedArt=await Artist.aggregate().match({artistId: {$in:cbArtId} })
                                                             .project({ _id:0 })
                   const item={...song,combinedArt}
                   songss.push(item)
               }) 
               artists.push(await Artist.aggregate().match({artistId: {$in:artId} })                                                    .project({ _id:0 }))
            }
            else {                
            }
            res.json({
                album:{albumId,albumName,thumbnail,preface,albumSlug,like,updatedAt,songId},
                artists:artists[0],
                songs:songss
            })
        } catch (error) {
            res.status(500).json({ err: 'somthing wrong' })
        }

    }
    async updateAlbum(req,res){
          const albumId=req.params.id
          const album= await Album.findOne({albumId:albumId})
          const update = await Album.updateOne({albumId:albumId},
             {
                  albumName:req.body.name||album.userName,
                  thumbnail:req.body.thumbnail||album.thumbnail,
                  like:req.body.like||album.like,
                  preface:req.body.preface||album.preface,
                  songId:req.body.songId||album.songId,
                  isPuclic:req.body.isPuclic||album.isPuclic,
                  isRandom:req.body.isRandom||album.isRandom,
                  //   sectionId:req.body.sectionId||album.sectionId,
             })
        res.json(update)
    }

}

module.exports = new AlbumController;