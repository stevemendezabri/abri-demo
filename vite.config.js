import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Prevents sourcemap issues during build
  },
  // Suppress specific logger warnings from node_modules dependencies
  customLogger: {
    warn(msg, options) {
      if (msg.includes('Sourcemap for') && msg.includes('node_modules')) {
        return; // Ignore third-party sourcemap warnings
      }
      // Pass through all other warnings
      console.warn(msg);
    },
  },
});