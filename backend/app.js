console.log('Iniciando aplicación');

require('dotenv').config();

const path = require('path');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');
const cookieParser = require('cookie-parser');
const cookieMiddleware = require('./middlewares/cookieMiddleware');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const cors = require('cors');

const corsOptions = {
  origin: 'https://client-six-bice.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};


app.use(cors(corsOptions));
app.options('*', cors());

app.use(cookieParser());
app.use(cookieMiddleware);

const checkToken = require('./middlewares/checkToken');
connectDB();

// Middleware de registro de solicitudes
app.use(logger('dev'));

// Middleware para procesar datos JSON y datos codificados en URL
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.get('/', (req, res) => {
  res.send("Welcome to My Project Manager")
})
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', checkToken, require('./routes/users'));

// Middleware de verificación de token antes de rutas protegidas
app.use('/api/projects', checkToken, require('./routes/projects'));
app.use('/api/tasks', checkToken, require('./routes/tasks'));

// Configurar ruta de proxy
const apiProxy = createProxyMiddleware('/api', {
  target: 'https://backend-kappa-one-37.vercel.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Eliminar prefijo '/api' al reenviar la solicitud
  },
});

app.use('/api', apiProxy);

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
