import { buildCoverage, parseLCOV } from '@lcov-viewer/core';
import { promises as fs } from 'fs';
import path from 'path';

async function lcov(src, { output }) {
  const [stats, lcovContent] = await Promise.all([fs.stat(src), fs.readFile(src, { encoding: 'utf8' })]);
  const date = stats.mtime.toString();
  const lcov = await parseLCOV(lcovContent);
  const coverage = buildCoverage(lcov);
  const assetsDirectory = path.resolve(__dirname, 'assets');
  await fs.mkdir(output, { recursive: true });
  const files = await fs.readdir(assetsDirectory);
  files.map(file => {
    const dest = path.resolve(output, file);
    return fs.copyFile(path.resolve(assetsDirectory, file), dest);
  });
  await fs.writeFile(
    path.resolve(output, 'report-data.js'),
    `window.REPORT_DATE = '${date.toString()}';window.COVERAGE_DATA = ${JSON.stringify(coverage)};`,
    { encoding: 'utf8' },
  );
}

export default lcov;
