import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: [{ find: '@', replacement: './src' }],
    }),
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    json(),
    typescript({
      module: 'ESNext',
      target: 'ES2020',
      declaration: true,
      declarationDir: 'dist',
      sourceMap: true,
    }),
    terser(),
  ],
  external: [
    'chalk',
    'commander',
    'download-git-repo',
    'fs-extra',
    'glob',
    'inquirer',
    'ora',
    'shelljs',
  ],
};
