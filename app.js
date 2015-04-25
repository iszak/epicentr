var express = require('express');
var path = require('path');
var logger = require('morgan');
var routes = require('./routes/index');

var app = express();

// socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  var disaster = 'earthquake';
  // socket.broadcast.emit(disaster);
});

server.listen(3000);

console.log('Listening on port 3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  if (app.get('env') !== 'development') {
    err = {};
  }

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
