import buildCoverage from './buildCoverage';

const createRecord = (path) => ({
  lines: { hit: 0, found: 0, details: [] },
  functions: { hit: 0, found: 0, details: [] },
  branches: { hit: 0, found: 0, details: [] },
  title: '',
  file: path,
});

describe('buildCoverage', () => {
  it('should process windows absolute path', () => {
    expect(buildCoverage([createRecord('C:\\src\\index.js')])).toEqual({
      'C/src/index.js': {
        filename: 'index.js',
        metrics: {
          branches: { covered: 0, total: 0 },
          functions: { covered: 0, total: 0 },
          lines: { covered: 0, total: 0 },
        },
        path: 'C/src/index.js',
      },
    });
  });

  it('should process unix absolute path', () => {
    expect(buildCoverage([createRecord('/src/index.js')])).toEqual({
      'src/index.js': {
        filename: 'index.js',
        metrics: {
          branches: { covered: 0, total: 0 },
          functions: { covered: 0, total: 0 },
          lines: { covered: 0, total: 0 },
        },
        path: 'src/index.js',
      },
    });
  });

  it('should process windows relative path', () => {
    expect(buildCoverage([createRecord('src\\index.js')])).toEqual({
      'src/index.js': {
        filename: 'index.js',
        metrics: {
          branches: { covered: 0, total: 0 },
          functions: { covered: 0, total: 0 },
          lines: { covered: 0, total: 0 },
        },
        path: 'src/index.js',
      },
    });
  });

  it('should process unix relative path', () => {
    expect(buildCoverage([createRecord('src/index.js')])).toEqual({
      'src/index.js': {
        filename: 'index.js',
        metrics: {
          branches: { covered: 0, total: 0 },
          functions: { covered: 0, total: 0 },
          lines: { covered: 0, total: 0 },
        },
        path: 'src/index.js',
      },
    });
  });
});
