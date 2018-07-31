const mongoose = require('mongoose');


// tentative
const profileSchema = mongoose.Schema({
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'users'
      },
      society_name : {
         type: String,
         required: true
      },
      college:{
         type: String,
         required: true
      },
      president_name :{
         type:String,
         required :true
      },
      mobile_number:{
         type: Number,
         required: true
      }
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
