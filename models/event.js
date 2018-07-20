const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
   name:{
        type: String,
        required: true,
    },
    college:{
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
      required: true
   },
   prizes_worth: {
      type: String,
      required: true
   }
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
