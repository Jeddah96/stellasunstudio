var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://127.0.0.1/stellasunstudio', {
  useMongoClient: true
});

module.exports = mongoose;