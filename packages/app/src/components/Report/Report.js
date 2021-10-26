import { CoverageIndicator, Summary, TreeView } from '@lcov-viewer/components';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useCoverageData from '../CoverageDataProvider/useCoverageData';
import classes from './Report.module.less';

const Report = () => {
  const { data: coverage } = useCoverageData();
  
  if (!coverage) {
    return <Redirect to="/"/>;
  }

  return (
    <div className={classes.root}>
      <Summary metrics={coverage.metrics}>
        <span>All Files</span>
      </Summary>
      <CoverageIndicator metrics={coverage.metrics.lines} />
      <TreeView coverage={coverage}/>
    </div>
  );
};

export default Report;
