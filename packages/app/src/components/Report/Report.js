import { CoverageIndicator, Summary, TreeView } from '@lcov-viewer/components';
import React from 'react';
import useCoverageData from '../CoverageDataProvider/useCoverageData';
import useCoverageDataControl from '../CoverageDataProvider/useCoverageDataControl';
import Redirect from '../Redirect/Redirect';
import classes from './Report.module.less';

const Report = () => {
  const { data: coverage } = useCoverageData();
  const [, unset] = useCoverageDataControl();
  
  if (!coverage) {
    return <Redirect to="/"/>;
  }

  return (
    <div className={classes.root}>
      <Summary metrics={coverage.metrics}>
        <a href="/" onClick={unset}>🠔 Back</a>
        <span className={classes.separator}>|</span>
        <span>All Files</span>
      </Summary>
      <CoverageIndicator metrics={coverage.metrics.lines} />
      <TreeView coverage={coverage}/>
    </div>
  );
};

export default Report;
