const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Keys = require('./config/keys');
const event_routes = require('./routes/events_routes');


const PORT = process.env.PORT || 3000;
const app = express();

//mongoose.connect('mongodb://localhost:27017/univent', { useNewUrlParser: true });
//mongoose.connect(Keys.monogdb.dbURI, { useNewUrlParser: true });
mongoose.connect('mongodb://admin:admin123@ds231941.mlab.com:31941/univent', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//routes middleware
app.use('/api', event_routes);

//test route
app.get('/', (req, res) => {
   res.status(200).send("This is working");
});
//error middleware
app.use(function(err, req, res, next) {
    res.status(422).send(err.message);
});

app.listen(PORT , () => {
   console.log(`Serving running at : ${PORT}`);
})
