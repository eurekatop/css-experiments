// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts', // Entry point of your application
  output: {
    file: 'dist/bundle.js', // Output bundle file
    format: 'es', // Output format (you can change it to 'es' for ES modules)
  },
  plugins: [
    resolve(), // Resolve npm modules
    commonjs(), // Convert CommonJS modules to ES modules
    typescript(), // Compile TypeScript
  ],
};
