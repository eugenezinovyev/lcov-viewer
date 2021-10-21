const fs = require('fs');
const path = require('path');
const { ReportBase } = require('istanbul-lib-report');

const buildMetrics = ({ lines, functions, branches }) => ({
  lines: { total: lines.total, covered: lines.covered },
  functions: { total: functions.total, covered: functions.covered },
  branches: { total: branches.total, covered: branches.covered },
});

const assetHeaders = {
  '.js': '/* eslint-disable */\n',
};

class IstanbulReport extends ReportBase {
  constructor(opts) {
    super();
    this.subdir = opts.subdir || 'lcov-viewer';
    this.verbose = opts.verbose;
    this.srcDir = path.resolve(__dirname, 'assets');
  }

  getWriter(context) {
    return !this.subdir ? context.writer : context.writer.writerForDir(this.subdir);
  }

  onStart(root, context) {
    this.writer = this.getWriter(context);
    this.collectedData = {};

    const self = this;
    fs.readdirSync(self.srcDir).forEach(file => {
      const resolvedSource = path.resolve(self.srcDir, file);
      const dest = `./${file}`;

      self.verbose && console.log(`Write asset: ${dest}`);
      self.writer.copyFile(resolvedSource, dest, assetHeaders[path.extname(file)]);
    });
  }

  onDetail(node) {
    const qualifiedName = node.getQualifiedName();
    const metrics = node.getCoverageSummary();

    this.collectedData[qualifiedName] = { metrics: buildMetrics(metrics), path: qualifiedName, filename: node.getRelativeName() };
  }

  onEnd() {
    const reportFile = path.resolve(this.writer.baseDir, 'app.js');

    const self = this;
    fs.readFile(reportFile, 'utf8', function (err, data) {
      if (!err) {
        const result = data.replace(/COVERAGE_DATA_PLACEHOLDER/g, JSON.stringify(self.collectedData));
        fs.writeFile(reportFile, result, 'utf8', err => err && console.error(err));
      } else {
        console.error(err);
      }
    });
  }
}

module.exports = IstanbulReport;
