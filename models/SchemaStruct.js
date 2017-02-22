var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schData = new Schema({
  Email: String,
  Subject: String,
  Content: String,
  Time: Date
}, {
  collection: 'Product'
});


module.exports.schData = schData;
