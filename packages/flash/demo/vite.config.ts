import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  server: {
    port: 4077,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
  },
  preview: {
    port: 4077,
  },
});
