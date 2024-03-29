const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const apiAdvertsRouter = require('./routes/api/adverts');
const apiUsersRouter = require('./routes/api/users');

const app = express();

const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//database
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/cloud_lily';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
console.log("Connected to database...");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/adverts', apiAdvertsRouter);
app.use('/api/users', apiUsersRouter);

// catch 404 and forward to error handler
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
  const ipInfo = req.ipInfo;
  let message = `Hey, are you lost? ${ipInfo.city}, ${ipInfo.country} ; I'm saving your ip anyway ${req.ip}`;
  console.log("Requesting 404 pages: "+ req.ip);
  res.send(message);
});

module.exports = app;
