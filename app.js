var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var dishes = require('./routes/dishes');

var app = express();

var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    return next();
});

// ROUTES
app.use('/', routes);

app.use('/api/users', users);

app.use('/api/dishes', dishes);

app.use('/api', function(req, res) {
    if (/^\/api\/$/.test('/api/')) res.send('Restaurant API');
});

app.get('/collections/:collectionName', function(req, res, next) {
    console.log('showing collection');
    req.collection.find({}, { limit: 10, sort: [['_id', -1]]}).toArray(function(e, results) {
        if (e) return next(e);
        res.send(results);
    });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
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

app.listen(3000);

module.exports = app;
