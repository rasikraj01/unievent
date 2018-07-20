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
         required:true,
         // max:10 ?
      },
      college:{
         type:String,
         required:true
      },
      course:{// field of study
         type: String,
         required: true
      },
      year:{//1st, 2nd, 3rd, 4th, 5th
         type: Number,
         required: true
      }
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
