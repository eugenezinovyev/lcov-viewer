import { CoverageIndicator, Footer, Summary, TreeView } from '@lcov-viewer/components';
import { buildCoverageTree } from '@lcov-viewer/core';
import React from 'react';
import sample from './sample.json';

import classes from './App.module.less';

const coverageTree = buildCoverageTree(sample);

const App = () => (
  <div className={classes.root}>
    <Summary metrics={coverageTree.metrics}>
      <span>All Files</span>
    </Summary>
    <CoverageIndicator metrics={coverageTree.metrics.lines} />
    <TreeView coverage={coverageTree}/>
    <Footer linkHref='https://www.npmjs.com/package/@lcov-viewer/istanbul-report'>
      Report generated at {window.REPORT_DATE}
    </Footer>
  </div>
);

export default App;
