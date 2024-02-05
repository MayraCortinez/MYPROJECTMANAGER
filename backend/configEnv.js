// config.js

require('dotenv').config(); // Cargar las variables de entorno desde .env

const isProduction = process.env.NODE_ENV === 'production';

const configEnv = {

  whiteList: isProduction
  ? [configEnv.URL_FRONTEND_PROD, configEnv.URL_BACKEND_PROD]
  : [configEnv.URL_FRONTEND, configEnv.URL_BACKEND],

  // Variable que cambia según el entorno
  BACKEND_URL: isProduction ? process.env.BACKEND_URL_PROD : process.env.BACKEND_URL,
  FRONTEND_URL: isProduction ? process.env.FRONTEND_URL_PROD : process.env.FRONTEND_URL,
  VITE_URL_BACKEND: isProduction ? process.env.VITE_URL_BACKEND_PROD : process.env.VITE_URL_BACKEND,
};

module.exports = configEnv;
