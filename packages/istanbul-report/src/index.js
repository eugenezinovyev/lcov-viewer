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
    this.reportDataWriter = this.writer.writeFile('report-data.js');

    const self = this;
    fs.readdirSync(self.srcDir).forEach(file => {
      const resolvedSource = path.resolve(self.srcDir, file);
      const dest = `./${file}`;

      self.verbose && console.log(`Write asset: ${dest}`);
      self.writer.copyFile(resolvedSource, dest, assetHeaders[path.extname(file)]);
    });
  }

  onDetail(node, context) {
    const qualifiedName = node.getQualifiedName();
    const metrics = node.getCoverageSummary();
    this.collectedData[qualifiedName] = {
      metrics: buildMetrics(metrics),
      path: qualifiedName,
      filename: node.getRelativeName(),
      details: {
        lines: undefined,
      },
    };

    const fileCoverage = node.getFileCoverage();
    const sourceText = context.getSource(fileCoverage.path);
    const lineStats = fileCoverage.getLineCoverage();

    if (lineStats) {
      this.collectedData[qualifiedName].details.lines = sourceText.split(/\r?\n|\r/)
        .map((line, index) => {
          const lineNumber = index + 1;

          return ({
            line: lineNumber,
            hits: lineStats[lineNumber.toString()] || 0,
            text: line,
          });
        });
    }
  }

  onEnd() {
    this.reportDataWriter.write(`window.REPORT_DATE = '${new Date().toString()}';`);
    this.reportDataWriter.write(`window.COVERAGE_DATA = ${JSON.stringify(this.collectedData)};`);
    this.reportDataWriter.close();
  }
}

module.exports = IstanbulReport;
