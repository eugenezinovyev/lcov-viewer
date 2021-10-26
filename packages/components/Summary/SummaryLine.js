import { calculatePercentage, clsx, resolveCoverageClass } from '@lcov-viewer/core';
import React from 'react';
import classes from './SummaryLine.module.less';

const SummaryLine = ({ name, metrics }) => {
  const percentage = calculatePercentage(metrics);

  return (
    <div className={classes.root}>
      <span className={classes.percentage}>{percentage.toFixed(1)}%</span>
      <span className={classes.name}>{name}</span>
      <span className={clsx(classes.badge, resolveCoverageClass(percentage, classes))}>{metrics.covered}/{metrics.total}</span>
    </div>
  );
};

export default SummaryLine;
