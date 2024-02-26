require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');

const app = express();

const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const checkToken = require('./middlewares/checkToken');
const cookieParser = require('cookie-parser');
const cookieMiddleware = require('./middlewares/cookieMiddleware');

const corsOptions = {
  origin: 'https://client-six-bice.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.options('/api/auth/send-token', cors(corsOptions));


connectDB();

//Configuración del proxy para redirigir solicitudes al backend
app.use(createProxyMiddleware('/api', {
  target: 'https://backend-kappa-one-37.vercel.app',
  changeOrigin: true,
})); 

// Middleware para manejo de cookies
app.use(cookieParser());
app.use(cookieMiddleware);

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors(corsOptions));


// Routes

app.get('/', (req, res) => {
  res.send('Welcome to My Project Manager');
  console.log('Backend successfully accessed');
});

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
    msg : err.message ? err.message : "Problemas con el servidor"
  })
});

module.exports = app;

