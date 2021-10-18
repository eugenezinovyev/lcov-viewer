const buildCoverage = (records) => records.reduce((aggregate, record) => {
  const path = record.file.replace(/\\/g, '/').replace(/^(.):/, '/$1');

  aggregate[path] = {
    metrics: {
      lines: { total: record.lines.found, covered: record.lines.hit },
      functions: { total: record.functions.found, covered: record.functions.hit },
      branches: { total: record.branches.found, covered: record.branches.hit },
    },
    path: path,
    filename: path.split('/').pop(),
  };

  return aggregate;
}, {});

export default buildCoverage;
