import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': 'https://backend-kappa-one-37.vercel.app/',
      '/auth': 'https://backend-kappa-one-37.vercel.app/',
      '/projects' : 'https://backend-kappa-one-37.vercel.app/'
    },
  },
});
