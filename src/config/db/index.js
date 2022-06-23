
const mongoose = require('mongoose');
async function connect(){
   try {
       await mongoose.connect('mongodb://localhost:27017/musicv1',{
           useNewUrlParser: true,
           useUnifiedTopology:true
       });
       console.log('Connect Successfully!!!')
   } catch (error) {
       console.log('Connect Fail!!!')
       
   }
}

module.exports = {connect}
