var express = require('express');
var http = require('http');
var query = require('./MongodbEngine.js');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//app.use(express.bodyParser());

// app.configure(function() {
//   app.set('port', process.env.PORT || 3000);
//   app.use(express.favicon());
//   app.use(express.json());
//   app.use(express.urlencoded());
//   app.use(express.cookieParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(__dirname + '/public'));

//   app.engine('html', require('hbs').__express);
//   app.set('views', __dirname + '/views');
//   app.set('view engine', 'html');
// });

app.use(express.static(__dirname + '/public'));

app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

query.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        var server = app.listen(3000, function() {
            var host = server.address().address
            var port = server.address().port

            console.log("Example app listening at http://:%s", port)
        })
    }
});


var home = require('./controllers/home.js')({
    app: app
});