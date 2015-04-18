// modules =================================================

var express = require("express");
var passport = require("passport");
var bodyParser = require("body-parser");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var app = express();

// configuration ===========================================


var db = require('./config/db');
var serverConf = require('./config/serverConf');


mongoose.connect(db.url);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: "this is the secret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(multer({dest: './uploads/'}));

app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app, passport);
require('./config/passport')(passport);


// start app ===============================================
app.listen(serverConf.port, serverConf.ip);
console.log("Server start at " + serverConf.ip + " : " + serverConf.port);