const mongoose = require('mongoose');
// rename to organizer

const userSchema = mongoose.Schema({
   society_email:{
      type: String,
      required: true
   },
   password:{
      type: String,
      required: true
   }, 
   acc_type:{// organizer or participant
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
