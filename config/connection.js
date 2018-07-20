const mongoose = require('mongoose');
const keys = require('./keys.js')

module.exports = () => {
   mongoose.connect(keys.db.mongodbURI, { useNewUrlParser: true }).then(() => console.log('Database Connected'));
   mongoose.Promise = global.Promise;
}
