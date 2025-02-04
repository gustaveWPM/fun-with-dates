// @ts-check

/// <reference types="vitest" />
/// <reference types="vite/client" />

// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      reporter: ['html', 'text']
    },
    include: ['**/?(*.){test,spec}.?(c|m)[jt]s?(x)'],
    environment: 'node',
    globals: true
  },
  plugins: []
});
