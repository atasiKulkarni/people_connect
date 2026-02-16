// require("dotenv").config({ debug: false });
var createError = require('http-errors');
var dotenv = require("dotenv");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // 1. Import the cors package
var app = express();
dotenv.config({ debug: false });
var employeeRouter = require('./routes/EmployeeRoute');
var eventRouter = require('./routes/eventsRoutes');
var bannerRoute = require('./routes/BannerRoute')
var postRoute = require('./routes/PostRoute')
var authRoute = require('./routes/AuthRoutes');

// Make the uploads folder publicly accessible via the /public route
app.use('/public', express.static('uploads'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors({  origin: "http://localhost:5173",  methods: ["GET", "POST", "OPTIONS"],  allowedHeaders: ["Content-Type", "Authorization"],}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/employees', employeeRouter);
app.use('/api/event', eventRouter);
app.use('/api/banner', bannerRoute);
app.use('/api/engage', postRoute);
app.use('/api/auth', authRoute);

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
  res.render('error');
});

module.exports = app;
