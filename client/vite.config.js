import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_URL_BACKEND_PROD
        : import.meta.env.VITE_URL_BACKEND,
    },
  },
  //base: '/nombre-de-tu-app/'
});
