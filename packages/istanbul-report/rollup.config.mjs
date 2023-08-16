import report from '@lcov-viewer/report';
import copy from '@lcov-viewer/rollup-copy';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.js',
    output: {
      file: './lib/index.js',
      format: 'cjs',
    },
    plugins: [
      terser(),
      copy({
        files: report.getAssets(),
        dest: './lib/assets',
      }),
    ],
  },
];