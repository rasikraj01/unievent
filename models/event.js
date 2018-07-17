const mongoose = require('mongoose');
const Schema = mongoose.Schema();

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
   date: {
      day:{
         type:Number
      },
      month:{
         type:Number
      },
      Year:{
         type:Number
      }
   },
   prizes_worth: {
      type: String,
      required: true
   }

});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
