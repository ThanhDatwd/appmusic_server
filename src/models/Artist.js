const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  customId = require("custom-id");

const Schema = mongoose.Schema;
const artistId=customId({});
const Artist = new Schema({
    artistId:{type:String,default:artistId,unique:true},
    artistName: {type:String,maxlength:255},
    avatar: {type:String,maxlength:255},
    password: {type:String,maxlength:255},
    follower:{type:Number, default:0},
    biography :{type:String,default:null},
    artistSlug: { type: String, slug: 'artistName',unique:true },
    birthday:{type:Date,default:Date.now},
    
  });
  
  // Add plugin
  mongoose.plugin(slug);
//   Artist.plugin(mongooseDelete,{
//          deletedAt:true,
//          overrideMethods: 'all' })
  
  module.exports = mongoose.model('Artist', Artist)