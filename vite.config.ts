import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import ts from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ts({
      check: false,
      include: ['src/index.ts', 'src/components'],
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          sourceMap: true,
          declarationMap: true,
        },
        exclude: ['vite.config.ts'],
      },
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueInfiniteScrolling',
      fileName: (format) => `vue-infinite-scrolling.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
