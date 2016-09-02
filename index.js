'use strict'

var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var dishes = require('./routes/dishes');
var menus = require('./routes/menus');
var weekMenus = require('./routes/weekMenus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', routes);
app.use('/api/dishes', dishes);
app.use('/api/menus', menus);
app.use('/api/week-menus', weekMenus);
// app.use('/api', function(req, res) {
    // if (/^\/api\/$/.test('/api/')) res.send('Restaurant API');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// 4 arguments, first error, express treats this as error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// TODO: handle error
mongoose.connect('mongodb://localhost:27017/test');

app.listen(3000);

module.exports = app;
