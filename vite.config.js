import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_']);
  return {
    plugins: [react(), tailwindcss()],
    envPrefix: ['VITE_', 'REACT_APP_'],
    define: {
      'process.env': env,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-genai': ['@google/genai'],
            'vendor-firebase': ['firebase/app', 'firebase/auth'],
          },
        },
      },
    },
  };
});
