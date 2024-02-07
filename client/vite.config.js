import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': {
        target: `${process.env.VITE_URL_BACKEND}`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/+/, ''), // remove leading slash
      },
      '/auth': {
        target: `${process.env.VITE_URL_BACKEND}`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/+/, ''), // remove leading slash
      },
      '/projects' : {
        target: `${process.env.VITE_URL_BACKEND}`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/+/, ''), // remove leading slash
      }
    },
  },
  base: process.env.VITE_URL_BACKEND,
});