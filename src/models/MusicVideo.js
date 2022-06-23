const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const MusicVideo = new Schema({
    mvName: {type:String,maxlength:255},
    poster: {type:String,maxlength:255},
    video:{type:String,maxlength:255,default:null},
    lyric :{type:String},
    slug: { type: String, slug: 'name',unique:true },
    release:{type:Date,default:Date.now},
    views:{type:Number,default:0},
    like:{type:Number,default:0},
    status:{type:Number,default:0},
    mainArtist:{
        type:Schema.Types.ObjectId,
        ref:'artist',
        default:null
    },
    combinedArtist:[{ type: mongoose.Types.ObjectId, ref: 'artist' }],
    albumId:[{ type: mongoose.Types.ObjectId, ref: 'album' }]
  });
  
  // Add plugin
  mongoose.plugin(slug);
//   MusicVideo.plugin(mongooseDelete,{
//          deletedAt:true,
//          overrideMethods: 'all' })
  
  module.exports = mongoose.model('MusicVideo', MusicVideo)