import axios from 'axios';

const baseURL = import.meta.env.VITE_URL_BACKEND;

export const clientAxios = axios.create({
  baseURL : baseURL
});