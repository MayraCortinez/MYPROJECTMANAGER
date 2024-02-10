console.log('Iniciando aplicación');

require('dotenv').config();
const path = require('path');

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');

const app = express();

const cors = require('cors');
// Descomentar y ajustar según tus necesidades
// const corsOptions = {
//   origin: 'https://client-six-bice.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// Usar el middleware cors con las opciones
app.use(cors());
// app.options('/auth/send-token', cors());

const checkToken = require('./middlewares/checkToken');
connectDB();

// Middleware de registro de solicitudes
app.use(logger('dev'));

// Middleware para procesar datos JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Middleware de verificación de token antes de rutas protegidas
app.use('/api/projects', checkToken, require('./routes/projects'));
app.use('/api/tasks', checkToken, require('./routes/tasks'));

// Enrutamiento para manejar rutas no definidas
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

// Middleware para manejar rutas no definidas
app.use(function(req, res, next) {
  console.log('Problemas en ruta no definida');
  next(createError(404));
});

// Middleware para manejar errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    msg: err.message && 'Problemas con el servidor',
  });
});

module.exports = app;
