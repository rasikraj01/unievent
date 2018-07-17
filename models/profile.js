const mongoose = require('mongoose');


// tentative
const profileSchema = mongoose.Schema({
      display_name :{
         first_name : {
            type: String,
            required: true
         },
         last_name :{
            type:String,
            required: false
         }
      },
      mobile_number :{
         type: String,
         required:true
      },
      college:{
         type:String,
         required:true
      },
      course:{
         type: String,
         required: true
      },
      year:{
         type: Number,
         required: true
      }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
