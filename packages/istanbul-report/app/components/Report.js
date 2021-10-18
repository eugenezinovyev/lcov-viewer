import TreeView from '@lcov-viewer/tree-view';
import React from 'react';
import classes from './Report.module.less';

const Error = () => <div className={classes.error}>No coverage data provided.</div>;

const Report = ({ coverage }) => (
  <div className={classes.root}>
    {coverage ? <TreeView coverage={coverage}/> : <Error/>}
  </div>
);

export default Report;
