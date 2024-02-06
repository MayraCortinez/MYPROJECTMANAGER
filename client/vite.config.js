import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://backend-my-project-manager.onrender.com/'
    },
  },
  //base: '/nombre-de-tu-app/'
});
