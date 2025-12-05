import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'AegisDateTimePicker',
      fileName: 'aegis-datetime-picker',
      formats: ['es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
