import { CoverageIndicator, Summary, TreeView } from '@lcov-viewer/components';
import { buildCoverageTree, LEAF_NODE } from '@lcov-viewer/core';
import React from 'react';
import Error from './Error';
import classes from './Report.module.less';

const Report = ({ coverage }) => {
  const tree = buildCoverageTree(coverage);
  const linkSelector = node => {
    if (node.type !== LEAF_NODE) {
      return null;
    }
    
    const { details } = coverage[node.path] || {};

    return details && details.lines && details.lines.length
      ? `/details/${encodeURIComponent(node.path)}`
      : null;
  };

  return (
    <div className={classes.root}>
      <Summary metrics={tree.metrics}>
        <span>All Files</span>
      </Summary>
      <CoverageIndicator metrics={tree.metrics.lines} />
      {coverage
        ? <TreeView coverage={tree} linkSelector={linkSelector}/>
        : <Error>No coverage data provided.</Error>}
    </div>
  );
};

export default Report;
