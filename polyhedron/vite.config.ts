import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const extensions = {
  es: 'es.js',
  cjs: 'cjs',
};

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    /* Reference:
    https://github.com/IgnacioNMiranda/vite-component-library-template */
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${extensions[format]}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
