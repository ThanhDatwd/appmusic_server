const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const Album = require('../models/Album')
const Artist = require('../models/Artist')
const Song = require('../models/Song')



 class UserController{
    async getUser(req,res){
          const email=req.user.email
          const userId=req.user.userId
          const user= await User.findOne({email,userId})

          const myPlaylist= await  Album.find({byUser:userId})
          let myPlaylistId=myPlaylist.map((p)=>p.albumId)

          user.myPlayList=myPlaylistId
          res.json(user)
     }
     async updateUser(req,res){
          const userId=req.user.userId
          const user= await User.findOne({userId:userId})
          const update = await User.updateOne({userId:userId},
               {
                    userName:req.body.name|| user.userName,
                    avatar:req.body.avatar|| user.avatar,
                    email:req.body.email|| user.email,
                    follower:req.body.follower|| user.follower,
                    biography:req.body.biography|| user.biography,
                    favoriteArtists:req.body.artists|| user.favoriteArtists,
                    favoriteSongs:req.body.songs|| user.favoriteSongs,
                    favoriteAlbums:req.body.albums|| user.favoriteAlbums,
                    favoriteMvs:req.body.mvs|| user.favoriteMvs,
                    myPlayList:req.body.myPlaylist|| user.myPlayList,
                    admin:req.body.admin|| user.admin,
                    artist:req.body.artist|| user.artist,
                    isVip:req.body.isVip|| user.isVip,
               })
          res.json(update)

     }
     async getFavorite(req,res){
          const email=req.user.email
          const userId=req.user.userId
          const user= await User.findOne({email,userId})
          const favoriteSongsId=user.favoriteSongs
          
          res.json(favoriteSongsId)
      }
      async getLibary(req,res){
          const email=req.user.email
          const userId=req.user.userId
          const user= await User.findOne({email,userId})
          res.json(user)
      }
 }
 module.exports = new UserController;