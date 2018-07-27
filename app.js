const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const hbs = require('hbs');
const path = require('path');


const event_routes = require('./routes/api/event_routes');
const profile_routes = require('./routes/api/profile_routes');
const user_routes = require('./routes/api/user_routes');
const unauthorized_routes = require('./routes/api/unauthorized_routes');
const organizer_routes = require('./routes/organizer_routes');


// passport config import
require('./config/passport-setup')(passport)

/****************

TODO:
2. Image Storage
3. Keys protection
5. Data Validations
7. Event Model Restructing ?
9. Edge Cases review
10. populate
11. heroku enviroment variables
12. Search
16. UI design
17. Frontend - login
18. Frontend - logout
19. Frontend - dashboard
20. register error handle and edge cases

****************/

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose connection
//mongoose.connect('mongodb://localhost:27017/univent', { useNewUrlParser: true }).then(() => console.log('mongoose running on DEV MACHINE'));
mongoose.connect('mongodb://admin:admin123@ds231941.mlab.com:31941/univent' , { useNewUrlParser: true }).then(() => console.log('Database Connected'));
mongoose.Promise = global.Promise;

/* FINAL PROD_version : require('./config/connection.js')(); */

// passport init
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// handlebars cconfig
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname, 'views'));

//static files
app.use(express.static(path.join(__dirname, 'static')));


// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// routes
app.use('/api/user', user_routes);
app.use('/api/event', event_routes);
app.use('/api/profile', profile_routes);
app.use('/api/unauthorized', unauthorized_routes);
app.use('/organizer', organizer_routes);

// home-route
app.get('/', (req,res) => {
   res.render('index', {a : 'test'})
});


app.listen(PORT, () => {
   console.log(`Sever running on PORT : ${PORT}`);
});
