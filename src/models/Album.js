const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  customId = require("custom-id");

const albumId=customId({});

const Schema = mongoose.Schema;
const Album = new Schema({
    albumId:{type:String,maxlength:255 ,default:albumId},
    albumName: {type:String,maxlength:255},
    thumbnail: {type:String,maxlength:255},
    like:{type:Number, default:0},
    albumSlug: { type: String, slug: 'albumName',unique:true },
    preface:{ type: String,default:''},
    updatedAt:{type:Date,default:Date.now},
    createdAt:{type:Date,default:Date.now},
    // albumCategoryId:{type:Array, default:[]}
    songId:[{ type:String, ref: 'songs' }],
    // auth:{type:String,ref: 'users'},
    byAdmin:{type:Boolean,default:false},
    byUser:{type:String,ref:'users'},
    isPuclic:{type:Boolean,default:true},
    isRandom:{type:Boolean,default:true},
    
  });
  
  // Add plugin
  mongoose.plugin(slug);
  // Album.plugin(mongooseDelete,{
  //        deletedAt:true,
  //        overrideMethods: 'all' })
  
  module.exports = mongoose.model('Album', Album)