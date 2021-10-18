import TreeView from '@lcov-viewer/tree-view';
import React from 'react';
import { Redirect } from 'react-router-dom';
import useCoverageData from '../CoverageDataProvider/useCoverageData';
import classes from './Report.module.less';

const Report = () => {
  const coverage = useCoverageData();

  return (
    <div className={classes.root}>
      {coverage ? <TreeView coverage={coverage}/> : <Redirect to="/"/>}
    </div>
  );
};

export default Report;
