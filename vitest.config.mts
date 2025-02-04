/// <reference types="vitest" />
/// <reference types="vite/client" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { configDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'path';

const exclude = [
  ...configDefaults.exclude,
  'node_modules'
];

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      exclude: [...exclude, '**/__tests__'],
      reporter: ['html', 'text']
    },
    include: [...configDefaults.include, '**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'node',
    globals: true,
    exclude
  },
  resolve: {
    alias: {
      '𝕍': resolve(__dirname, './.vitest'),
    }
  },
  plugins: []
});
