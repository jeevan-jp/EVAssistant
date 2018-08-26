// const express  = require('express');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dataRouter = require('./routes/data');


var session = require('express-session');

var flash = require('connect-flash');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dbdata', { useMongoClient: true });

require("./models/Data");



var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/data', dataRouter);


app.use(session({ cookie: { maxAge: 60000 }, 

    secret: 'secret',

    resave: false, 

    saveUninitialized: false}));
    app.use(function(req, res, next) {
        next(createError(404));
      });
      
      // error handler
      app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
      
        // render the error page
        res.status(err.status || 500);
        res.render('error');
      });
      
      module.exports = app;
        