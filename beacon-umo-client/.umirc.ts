import { routes } from './src/routes';
import { defineConfig } from '@umijs/max';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  srcTranspiler: 'esbuild',
  esbuildMinifyIIFE: true,
  extraPostCSSPlugins: [tailwindcss],
  hash: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
  antd: {},
  access: {},
  model: {},
  initialState: {},
  layout: {
  },
  mfsu: {},
  npmClient: 'npm',
  routes,
});

