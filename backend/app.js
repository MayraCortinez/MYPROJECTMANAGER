console.log('iniciando aplicación');

require('dotenv').config();
const path = require('path');

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');


const app = express();

const cors = require('cors');
const corsOptions = {
  origin: 'https://client-six-bice.vercel.app', // El origen permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Los métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Los encabezados permitidos
  credentials: true // Si se permiten credenciales
};

// Usar el middleware cors con las opciones
app.use(cors(corsOptions));
// app.options('/auth/send-token', cors());
const checkToken = require('./middlewares/checkToken');


connectDB();

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  
 


// Routes
app
  .use('/', require('./routes/index'))
  .use('/auth', require('./routes/auth'))
  .use('/users', require('./routes/users'))
  .use('/projects', checkToken, require('./routes/projects'))
  .use('/tasks', checkToken, require('./routes/tasks')) 

// Middleware para manejar rutas no definidas
app.use(function(req, res, next) {
  console.log('Problemas en ruta no definida')
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
    msg : err.message && "Problemas con el servidor"
  })
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});


module.exports = app;
