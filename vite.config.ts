import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return;
          if (id.includes('/react-router/') || id.includes('/react-router-dom/')) return 'vendor-router';
          if (
            id.includes('/framer-motion/') ||
            id.includes('/motion-dom/') ||
            id.includes('/motion-utils/')
          ) {
            return 'vendor-motion';
          }
          if (/\/(react|react-dom|scheduler)\//.test(id)) return 'vendor-react';
          if (id.includes('/tailwind-merge/')) return 'vendor-utils';
        },
      },
    },
  },
});
