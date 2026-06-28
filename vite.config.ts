import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
  },
  build: {
    // Minify for production
    minify: 'esbuild',
    // Optimize target for modern browsers
    target: 'esnext',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'sonner'],
  },
});
