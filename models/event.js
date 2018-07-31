const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
   },
   event_name:{
        type: String,
        required: true,
    },
    host_college:{
        type: String,
        required: true
    },
    venue:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    society : {
        type:String,
        required:true
    },
    form_link:{
        type: String,
        required: true
    },
    cover_photo:{
      link:{
         type: String,
         required: true
      },
      name:{
         type: String,
         required: true
      }
   },
    number_of_participants :{
      type:Number,
      required: true
   },
   date : {
      type: Date,
      required: true,
   },
   prize_description: {
      type: String,
      required: true
   },
   tags:{
      type: [String],
      required: true
   },
   event_incharge:{
      name:{
         type:String,
         required: true
      },
      mobile_number:{
         type:Number,
         required: true
      }
   }

});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
