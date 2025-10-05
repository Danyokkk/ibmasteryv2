import { defineConfig } from 'vite';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills()
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify'
    }
  }
});