var mongoose = require('mongoose')
var config = require('./config.json');

function connect(callbackvalue) {
  mongoose.connect(config.mongodbUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', callbackvalue);
}

function insert(schema, json, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  var obj = new objmodel(json);
  obj.save(function(err, result) {

    callbackvalue(err, result);
  });
}

function insertCategory(schema, json, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  var obj = new objmodel(json);
  obj.save(function(err, result) {

    callbackvalue(err, result);
  });
}



function fetchOne(schema, query, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  objmodel.findOne(query, function(err, result) {

    callbackvalue(err, result);
  });
}

function fetchAll(schema, query, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  objmodel.find(query, function(err, result) {

    callbackvalue(err, result);
  });
}

function remove(schema, json, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  objmodel.remove({
    _id: json._id
  }, function(err) {

    callbackvalue(err);
  });
}


function fetchOneAndUpdate(schema, query, update, options, callbackvalue) {
  var db = mongoose.connection;
  var objmodel = db.model(schema.options.collection, schema);
  objmodel.findOneAndUpdate(query, update, options, function(err, result) {

    callbackvalue(err, result);
  });
}

module.exports.connect = connect;
module.exports.insert = insert;
module.exports.insertCategory = insertCategory;
module.exports.remove = remove;
module.exports.fetchOne = fetchOne;
module.exports.fetchAll = fetchAll;
module.exports.fetchOneAndUpdate = fetchOneAndUpdate;
module.exports.mongoose = mongoose;
