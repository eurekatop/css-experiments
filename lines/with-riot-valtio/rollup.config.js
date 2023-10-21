import riot from 'rollup-plugin-riot'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import css from 'rollup-plugin-css-bundle'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
  },
  plugins: [
    riot(),
    nodeResolve(),
    commonjs(),
    typescript(),
    css({ output: 'dist/bundle.css' }),
  ],
}
