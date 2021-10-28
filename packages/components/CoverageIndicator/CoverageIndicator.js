import { calculatePercentage, clsx, resolveCoverageClass } from '@lcov-viewer/core';
import React from 'react';
import classes from './CoverageIndicator.module.less';

const CoverageIndicator = ({ metrics }) => <div className={clsx(classes.root, resolveCoverageClass(calculatePercentage(metrics), classes))}/>;

export default CoverageIndicator;
