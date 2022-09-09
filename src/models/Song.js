const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  customId = require("custom-id");

const Schema = mongoose.Schema;
const songId=customId({});
const Song = new Schema({
    songId:{type:String,default:songId},
    songName: {type:String,maxlength:255},
    poster: {type:String,maxlength:255},
    audio:{type:String,maxlength:255},
    musicVideo:{type:String,maxlength:255,default:null},
    lyric :[{type:Object}],
    slug: { type: String, slug: 'songName',unique:true },
    release:{type:Date,default:Date.now},
    listens:{type:Number,default:0},
    like:{type:Number,default:0},
    oldRank:{type:Number,default:0},
    newRank:{type:Number,default:0},
    // type:{type:String},
    mainArt:{
        type:String,
        ref:'artists',
        default:null
    },
    combinedArt:[{ type:String, ref: 'artists' }],
    albumId:[{ type: mongoose.Types.ObjectId, ref: 'album' }],
    isVip:{type:Boolean, default:false}
  });
  
  // Add plugin
  mongoose.plugin(slug);
//   Song.plugin(mongooseDelete,{
//          deletedAt:true,
//          overrideMethods: 'all' })
  
  module.exports = mongoose.model('Song', Song)