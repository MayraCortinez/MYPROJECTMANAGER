console.log('iniciando aplicación');

require('dotenv').config();
const configEnv = require('../backend/configEnv');

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');
const path = require('path');


const app = express();

const cors = require('cors');
app.options('/api/auth/send-token', cors());
const checkToken = require('./middlewares/checkToken');


connectDB();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  
  const corsOptions = {
    origin: 'https://my-project-manager-frontend.onrender.com', // El origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Los encabezados permitidos
    credentials: true // Si se permiten credenciales
  };
  
  // Usar el middleware cors con las opciones
  app.use(cors(corsOptions));


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