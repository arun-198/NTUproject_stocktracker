import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ]
  },
  server: {
    open: true, // Automatically opens browser on server start
    port: 3000,  // Default port for Vite development server
    watch: {
        usePolling: true,
      },
  }
});