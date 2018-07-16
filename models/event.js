const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const eventSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    college:{
        type: String,
        require: true
    },
    venue:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    society :{
        type:String,
        require:true
    },
    form_link:{
        type: String,
        require: true
    },
    cover_link:{
      type:String,
      require:true
   },
    number_of_participants :{
      type:Number,
      require: true
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
      require: true
   }

});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;
