import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.VITE_API_BASE_URL || 'https://web.moonlumevpn.ru/api';

  return {
    plugins: [react()],
    build: {
      target: 'es2017',
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: '127.0.0.1',
      port: 8000,
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
