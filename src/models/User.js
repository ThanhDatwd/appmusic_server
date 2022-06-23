const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  customId = require("custom-id");

const Schema = mongoose.Schema;
const UserId=customId({});
const User = new Schema({
    userId:{type:String,default:UserId,unique:true},
    userName: {type:String,maxlength:255},
    email:{type:String,maxlength:255,unique:true},
    avatar: {type:String,maxlength:255, default:'https://m.myclip.vn/images/avatar.gif'},
    password: {type:String,maxlength:255},
    follower:{type:Number, default:0},
    userSlug: { type: String, slug: 'userName',unique:true },
    biography :{type:String,default:null},
    birthday:{type:Date,default:Date.now},
    // playlistLibary:[{ type:String, ref: 'u' }],
    favoriteArtists:[{ type:String, ref: 'users' }],
    favoriteSongs:[{ type:String, ref: 'songs' }],
    favoriteAlbums:[{ type:String, ref: 'albums' }],
    favoriteMvs:[{ type:String, ref: 'musicvideos' }],
    myPlayList:[{ type:String, ref: 'songs' }],
    history:[{type:String,ref: 'songs'}],
    admin:{type:Boolean,default:false},
    artist:{type:Boolean,default:false},
    isVip:{type:Boolean,default:false},
  });
  
  // Add plugin
  mongoose.plugin(slug);
//   User.plugin(mongooseDelete,{
//          deletedAt:true,
//          overrideMethods: 'all' })
  
  module.exports = mongoose.model('User', User)