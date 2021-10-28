import React from 'react';
import SummaryLine from './SummaryLine';
import classes from './Summary.module.less';

const Summary = ({ children, metrics }) => (
  <header className={classes.root}>
    <h1 className={classes.title}>
      {children}
    </h1>
    <div className={classes.summary}>
      <SummaryLine name="lines" metrics={metrics.lines}/>
      <SummaryLine name="functions" metrics={metrics.functions}/>
      <SummaryLine name="branches" metrics={metrics.branches}/>
    </div>
  </header>
);

export default Summary;
