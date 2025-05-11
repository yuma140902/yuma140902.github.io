import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { name as rawName } from './package.json';

const name = rawName.replace(/\//g, '-').replace(/@/g, '');

export default defineConfig({
  plugins: [react()],
  build: {
    /* Reference:
    https://github.com/IgnacioNMiranda/vite-component-library-template */
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      formats: ['es', 'umd'],
      fileName: (format) => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
