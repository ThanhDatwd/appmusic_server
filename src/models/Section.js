const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const  customId = require("custom-id");
const Schema = mongoose.Schema;
const sectionId=customId({});
const Section = new Schema({
    title: {type:String,maxlength:255},
    sectionId:{type:String,default:sectionId},
    sectionType: {type:String,maxlength:255},
    items:[{type:String,maxlength:255}]

    
  });
  
  // Add plugin
  mongoose.plugin(slug);
  // Section.plugin(mongooseDelete,{
  //        deletedAt:true,
  //        overrideMethods: 'all' })
  
  module.exports = mongoose.model('Section', Section)