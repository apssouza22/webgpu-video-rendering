import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    // Top-level await in main.ts (WebGPU init)
    target: 'es2022',
  },
});
