import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/': 'https://backend-my-project-manager.onrender.com',
      '/auth': 'https://backend-my-project-manager.onrender.com',
      '/projects' : 'https://backend-my-project-manager.onrender.com'
    },
  },
});
