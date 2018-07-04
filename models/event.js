const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const eventSchema = new Schema({
    name :{
        type: String,
        require: True,
    },
    college:{
        type: String,
        require: True
    },
    venue:{
        type: String,
        require: True
    },
    description:{
        type: String,
        require: True
    },
    society :{
        type:String,
        require:True
    },
    link:{
        type: String,
        require: True
    }

});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;