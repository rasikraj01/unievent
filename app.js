const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

const routes = require('./routes/events_routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

//routes middleware
app.use('/api', routes);

//error middleware
app.use(function(err, req, res, next) {
    res.status(422).send(err.message);
});

app.listen(PORT , () => {
   console.log(`Serving running at : ${PORT}`);
})