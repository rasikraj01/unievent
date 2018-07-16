const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
      display_name :{
         first_name : {
            type: String,
            require: true
         },
         last_name :{
            type:String,
            require: false
         }
      },
      mobile_number :{
         type: String,
         require:true
      },
      college:{
         type:String,
         require:true
      },
      acc_type:{// organiser or participant
         type:String,
         require:true
      }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
