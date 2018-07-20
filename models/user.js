const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   username :{
      type: String,
      required: true,
      max: 30
   },
   email:{
      type: String,
      required: true
   }
   password:{
      type: String,
      required: true
   },
   acc_type:{// organiser or participant
      type: String,
      required: true
   },
   reg_date:{
      type:Date,
      default: Date.now
   }

});

const User = mongoose.model('user', userSchema);
module.exports = User;
