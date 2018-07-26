const mongoose = require('mongoose');


// tentative
const profileSchema = mongoose.Schema({
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'users'
      },
      username :{
         type: String,
         required: true,
         max: 30
      },
      mobile_number :{
         type: String,
         required:true,
         // max:10 ?
      },
      college:{
         type:String,
         required:true
      },
      field_of_study:{
         type: String,
         required: true
      },
      year:{
         type: Number,
         required: true
      }
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
