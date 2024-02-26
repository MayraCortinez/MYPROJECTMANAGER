import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-kappa-one-37.vercel.app',
        changeOrigin: true,
        secure: false, 
        ws: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
});
