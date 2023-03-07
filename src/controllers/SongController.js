


const { default: mongoose } = require('mongoose')
const Song = require('../models/Song')
const Artist = require('../models/Artist')

class SongController {

    async index(req, res, next) {
        try {
            let limit=Number(req.query.limit)||1000000
            const songss = [];
            let songs = await Song.aggregate()
                .lookup({ from: 'artists', localField: 'mainArt', foreignField: 'artistId', as: 'mainArtist' })
                .project({
                    _id: 0,
                    mainArt: 0,
                })
                .sort({ release: -1 })
                .limit(limit);
            if (songs != []) {
                songs.forEach(async (song, index) => {
                    const cbArtId = song.combinedArt
                    const combinedArt = await Artist.aggregate().match({ artistId: { $in: cbArtId } })
                        .project({ _id: 0 })
                    const item = {}
                    songss.push({ ...song, combinedArt })
                })
                await Artist.aggregate().match({ artistId: { $in: ['0'] } })
            }
            res.json(songss)
        } catch (error) {
            
        }

    }
    async create(req, res, next) {
        await Song.create({
            songName: req.body.name,
            poster: req.body.image,
            audio: req.body.url,
            lyric: req.body.lyric,
        })
            .then(() => {
                res.json({
                    mesage: 'successful new creation',
                })
                    .catch(e => {
                        res.json(e)
                    })
            })
        res.json([
            {
                mesage: 202
            }
        ])
    }
    show(req, res, next) {

    }
    async getMany(req, res) {
        const songsId = req.body.data
        try {
            const songss = [];
            let songs = await Song.aggregate()
                .lookup({ from: 'artists', localField: 'mainArt', foreignField: 'artistId', as: 'mainArtist' })
                .project({
                    _id: 0,
                    // mainArt: 0,
                })
                .sort({ release: -1 })
                .match({ songId: { $in: songsId } })
            if (songs != []) {
                songs.forEach(async (song, index) => {
                    const cbArtId = song.combinedArt
                    const combinedArt = await Artist.aggregate().match({ artistId: { $in: cbArtId } })
                        .project({ _id: 0 })
                    const item = {}
                    songss.push({ ...song, combinedArt })
                })
                await Artist.aggregate().match({ artistId: { $in: ['0'] } })
            }
            res.json(songss)
        } catch (error) {

        }

    }
    async update(req,res){
        const songId=req.params.id
        const song = await Song.findOne({songId:songId})
        if(song!==null){
            const update= await Song.updateOne({songId:songId},
                                        {
                                            songName:req.body.name||song.songName,
                                            poster:req.body.poster||song.poster,
                                            lyric:req.body.lyric||song.lyric,
                                            musicVideo:req.body.video||song.musicVideo,
                                            mainArt:req.body.mainArt||song.mainArt,
                                            combinedArt:req.body.combinedArt||song.combinedArt,
                                            listens:song.listens+1,
                                            like:req.body.like||song.like,
                                            newRank:req.body.newRank||song.newRank,
                                            oldRank:req.body.oldRank||song.oldRank,
                                        }
                                        )
            res.json(update)
        }
        res.json('have something with song')

    }
    async upload(req, res) {
        // const fileStr = req.body.data
        // console.log(fileStr)
        // res.json('this is d' + fileStr)
        // // try {
        // //     const fileStr = req.body.data
        // //     const uploadReponse = await cloudinary.uploader.upload(fileStr,
        // //         {upload_preset:'songs'}
        // //         )
        // //     console.log('chào bạn mình là upload')
        // //     res.json({mes:200,
        // //               file:uploadReponse   
        // //              })

        // // } catch (error) {
        // //     res.status(500).json({err:'somthing wrong'})
        // // } 
        // res.json('mẹ mày muốn gì ')

    }

}

module.exports = new SongController;