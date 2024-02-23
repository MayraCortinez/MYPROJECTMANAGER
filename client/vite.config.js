import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [reactCookie], 
    },
  },
  server: {
    proxy: {
      '/api': 'https://backend-kappa-one-37.vercel.app',
    },
  }
});
