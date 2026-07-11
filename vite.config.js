import { defineConfig } from 'vite';

export default defineConfig({
  base: '/portfolio-magang/',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        inventory: './inventory.html'
      }
    }
  }
});
