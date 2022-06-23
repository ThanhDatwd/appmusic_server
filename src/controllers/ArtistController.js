

const Artist = require('../models/Artist')
const Song = require('../models/Song')
class ArtistController {

    async index(req, res, next) {
        let a = await Artist.aggregate(
            [
                {
                    "$lookup": {
                        from: "songs",
                        localField: "_id",
                        foreignField: "mainArtist",
                        as: "songs"
                    }

                }
            ]
        );
        res.send(a)

    }
    async create(req, res, next) {
        await Artist.create({
            artistName: req.body.name,
            image: req.body.image,
            biography: req.body.biography,
            birthday: req.body.birthday,
        })
            .then(() => {
                res.json({
                    mesage: 'successful new creation',
                })
                    .catch(e => {
                        res.json(e)
                    })
            })
    }
    async show(req, res, next) {
       
        try {
            const artist = await Artist.findOne({ artistSlug: req.params.name })
            const artId = [artist.artistId]
            const songss = [];
            const songs = await Song.aggregate()
                                    .match({ mainArt: { $in: artId } })
                                    .project({
                                        _id: 0,
                                        albumId: 0
                                    })
            if (songs!= []) {
                songs.forEach(async (song, index) => {
                    const cbArtId = song.combinedArt
                    const combinedArt = await Artist.aggregate().match({ artistId: { $in: cbArtId } })
                                                               .project({ _id: 0 })
                    const item = {  }
                    songss.push({...song,combinedArt})
                })
                await Artist.aggregate().match({artistId: {$in:artId} })
            }
            res.json({
                artist,
                songs:songss
            })
        } catch (error) {

        }

    }

}

module.exports = new ArtistController;