import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/ipify": {
        target: 'https://api.ipify.org?format=json',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ipify/, ""),
      }
      // "/dadata": {
      //   target: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/dadata/, ""),
      // }
    }
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
})
