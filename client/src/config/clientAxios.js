import Axios from 'axios';
require('dotenv').config(); 

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.VITE_URL_BACKEND_PROD // Usando la variable de entorno de producción
  : process.env.VITE_URL_BACKEND; // Usando la variable de entorno de desarrollo

export const clientAxios = Axios.create({
  baseURL: baseURL,
});

export default clientAxios;