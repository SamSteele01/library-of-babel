'use strict';

var mongoose = require('mongoose');

var mongoDB = process.env.MONGODB_URI || 'mongodb://mongo:27017/libraryOfBabel';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

// test MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
  // we're connected!
  console.log('Connected to mongoDB.');
});

module.exports = db;