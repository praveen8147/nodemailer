var url = require('url');
var config = require('../config.json');
var qry = require('../MongodbEngine.js');
var querystring = require("querystring");
var obj = require('../models/SchemaStruct.js');
var objNew = require('../models/productCategory.js');
var os = require('os');

var nodemailer = require("nodemailer");
moment = require('moment');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "praveeng.pes@gmail.com",
        pass: "sachin412744"
    }
});
/*------------------SMTP Over-----------------------------*/

function home(params) {
    var app = params.app;
    app.get('/', OnLoad);
    app.post('/send', sendMail);
    app.get('/DeleteAppRecord/:_id', DeleteAppRecord);
    app.post('/get_product', GetProduct);
}


///*------------------insert record------------*/

function sendMail(req, res) {
    console.log("======>" + req.body);
    var mailOptions = {
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.content
    }

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            obj.Email = req.body.email,
                obj.Subject = req.body.subject,
                obj.Content = req.body.content,

                obj.Time = moment.utc()._d

            qry.insert(obj.schData, obj, function(err, resultApp) {
                if (err) {
                    console.log("Error : ", err);
                    return;
                }
            });
            res.end("sent");
        }
    });
    res.redirect('/');
}

///*------------------Delete record------------*/
function DeleteAppRecord(req, res) {
    qry.fetchOne(obj.schData, {
        _id: req.params._id
    }, function(err, resultDApp) {
        if (!err) {
            if (resultDApp) {
                resultDApp.remove();
                res.redirect('/');
            }
        }
    });
}



///*------------------On Page Load------------*/
function OnLoad(req, res) {
    qry.fetchAll(obj.schData, {}, function(err, data) {
        if (!err) {
            res.render('Home.html', {
                layout: false,
                'data': data
            });
        }
    });
}


//--------------------------

function GetProduct(req, res) {

    qry.fetchAll(obj.schData, {
        Category: req.body.Subject
    }, function(err, data) {
        if (!err) {
            res.render('Home.html', {
                layout: false,
                'data': data
            });
        }
    });
}

module.exports = home;