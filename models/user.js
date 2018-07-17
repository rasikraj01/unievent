const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      username : {
         type:String,
         required: true,
      },
      password :{
         type: String,
         required : true
      },
      email:{
         type: String,
         requied: true
      },
      acc_type:{// organiser or participant
         type:String,
         required:true
      }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
