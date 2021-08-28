const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@mongo:27017/', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;