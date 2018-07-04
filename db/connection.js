const mongoose = require('mongoose');


    mongoose.connect('mongodb://localhost/Unievent');
    mongoose.Promise = global.Promise;