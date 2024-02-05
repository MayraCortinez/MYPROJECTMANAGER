// config.js

require('dotenv').config(); // Cargar las variables de entorno desde .env

const isProduction = process.env.NODE_ENV === 'production';

const configEnv = {
  // Variables que cambian según el entorno
  BACKEND_URL: process.env.BACKEND_URL_PROD || process.env.BACKEND_URL,
  FRONTEND_URL: process.env.FRONTEND_URL_PROD || process.env.FRONTEND_URL,
  VITE_URL_BACKEND: process.env.VITE_URL_BACKEND_PROD || process.env.VITE_URL_BACKEND,

  whiteList: [configEnv.BACKEND_URL, configEnv.FRONTEND_URL], // Lista única para ambos entornos
};

module.exports = configEnv;

