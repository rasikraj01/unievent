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
    society :{
        type:String,
        required:true
    },
    form_link:{
        type: String,
        require: true
    },
    cover_link:{
      type:String,
      required:true
   },
    number_of_participants :{
      type:Number,
      required: true
   },
   date : {
      type: Date,
      required: true,
      //abhi k liye hai ye bs remember to remove
      default : Date.now
   },
   prizes_worth: {
      type: String,
      required: true
   }
   // contact org + contact mobile muber field
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
