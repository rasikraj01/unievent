const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

//route imports
const event_routes = require('./routes/api/event_routes');
const profile_routes = require('./routes/api/profile_routes');
const user_routes = require('./routes/api/user_routes');


// passport config import
require('./config/passport-setup')(passport)

/****************

TODO:
1. Authorization of routes
2. Image Links
3. Keys protection
4. Code cleanUp and comments
5. Data Validations
6. Update Readme
7. Event Model Restructing ?
8. Add profile routes
9. 

****************/

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose connection
// require('./config/connection.js')();
mongoose.connect('mongodb://localhost:27017/univent', { useNewUrlParser: true }).then(() => console.log('mongoose running on DEV MACHINE'));
//mongoose.connect('mongodb://admin:admin123@ds231941.mlab.com:31941/univent', { useNewUrlParser: true }).then(() => console.log('mongoose running on DEV MACHINE'));

mongoose.Promise = global.Promise;


// passport init
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
app.use('/api/user', user_routes);
app.use('/api/event', event_routes);
app.use('/api/profile', profile_routes);


app.get('/', (req,res) => {
   res.send('working')
})

app.listen(PORT, () => {console.log(`Sever running on PORT : ${PORT}`);})
