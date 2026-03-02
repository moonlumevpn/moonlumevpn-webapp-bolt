import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '127.0.0.1',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:5020',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});
