const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//route imports
const event_routes = require('./routes/api/event_routes');
const profile_routes = require('./routes/api/profile_routes');
const user_routes = require('./routes/api/user_routes');

// passport import
require('./config/passport-setup')(passport)

const app = express();
const PORT = process.env.PORT || 3000;

//mongoose setup
mongoose.connect('mongodb://localhost:27017/univent', { useNewUrlParser: true }).then(() => console.log('mongoose running on DEV MACHINE'));
mongoose.Promise = global.Promise;


// passport init
app.use(passport.initialize());


// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use('/api/user', user_routes);
//app.use('/api/event', event_routes);
app.use('/api/profile', profile_routes);


app.get('/', (req,res) => {
   res.send('working')
})

app.listen(PORT, () => {console.log(PORT);})
