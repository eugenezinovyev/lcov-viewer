import { getAssets } from '@lcov-viewer/report';
import copy from '@lcov-viewer/rollup-copy';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import shebang from 'rollup-plugin-preserve-shebang';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/index.js',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [
      terser(),
      shebang(),
      copy({
        files: getAssets(),
        dest: './lib/assets',
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
    ],
  },
];