const mongoose = require('mongoose');

mongoose.connect('mongodb://root:example@mongo:27017/Users');
mongoose.Promise = global.Promise;

module.exports = mongoose;