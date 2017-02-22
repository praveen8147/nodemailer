var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var productCategory = new Schema({
  CategoryName: String,
  Food: [{
    //type: Array
  }],

  Status: String
}, {
  collection: 'Category'
});

module.exports.productCategory = productCategory;
