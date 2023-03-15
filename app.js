require('dotenv').config();
require('./db');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

// Routers require
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const courseRouter = require('./routes/courses');

const app = express();

// cookies and loggers
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// For deployment
app.set('trust proxy', 1);
app.use(
  session({
    name: 'cookie-name',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 2592000000 // 30 days in milliseconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    })
  })
)

// routes intro
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/courses', courseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (err.status === 404) {
    res.status(404).json({ errorMessage: `Could not find ${req.url}` });
  } else {
    res.status(err.status || 500).json({ errorMessage: err })
  }
});

module.exports = app;
