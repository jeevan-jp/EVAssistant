// const express  = require('express');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dbdata', { useMongoClient: true });

require("./models/data");

var dataRouter = require('./routes/data');


var session = require('express-session');

var flash = require('connect-flash');




var app = express();

app.use(session({ cookie: { maxAge: 60000 }, 

    secret: 'secret',

    resave: false, 

    saveUninitialized: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use('/data', dataRouter);



    
      
      // error handler
app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
app.listen(3333,()=>{console.log("server is running on port 3333")})
      
 module.exports = app;
        