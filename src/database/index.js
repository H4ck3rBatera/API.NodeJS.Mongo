require("dotenv").config();
const mongoose = require('mongoose');

const uri = 'mongodb://root:20DeJunhoDe1971@localhost:27017/'
mongoose
    .connect(uri)
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

mongoose.Promise = global.Promise;

module.exports = mongoose;