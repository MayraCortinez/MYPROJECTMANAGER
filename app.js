require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');

const app = express();

const cors = require('cors');
app.options('/api/auth/send-token', cors());
const checkToken = require('./middlewares/checkToken');
const whiteList = [process.env.URL_FRONTEND, process.env.URL_BACKEND];
/* const corsOptions = {
  origin : function (origin, cb) {
    if (whiteList.includes(origin)){
      cb(null, true)
    }else{
      cb(new Error('Error de Cors'))
    }
  }
} */

connectDB();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())


// Routes
app
  .use('/api/auth', require('./routes/auth'))
  .use('/api/users', require('./routes/users'))
  .use('/api/projects', checkToken, require('./routes/projects'))
  .use('/api/tasks', checkToken, require('./routes/tasks')) 

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
  res.status(err.status || 500).json({
    ok : false,
    msg : err.message ? err.message : "Problemas Houston"
  })
});

module.exports = app;
