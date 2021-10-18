import clsx from 'clsx';
import React, { useMemo } from 'react';
import { BRANCH_NODE } from './coverageTree';
import classes from './NodeStats.module.less';

const GOOD_COVERAGE = 80;
const NORMAL_COVERAGE = 60;

const defaultStats = {
  lines: { total: 0, covered: 0 },
  functions: { total: 0, covered: 0 },
  branches: { total: 0, covered: 0 },
};

const statCategories = Object.keys(defaultStats);
const calculateCoverage = (tree, coverage) => {
  const aggregateStats = node => node.type === BRANCH_NODE
    ? Object.keys(node.children).reduce((memo, childKey) => statCategories.reduce((stats, category) => {
      const childStats = aggregateStats(node.children[childKey]);

      return {
        ...stats,
        [category]: {
          total: memo[category].total + childStats[category].total,
          covered: memo[category].covered + childStats[category].covered,
        },
      };
    }, {}), defaultStats)
    : coverage[node.path].metrics;

  return aggregateStats(tree);
};

const StatColumns = ({ stats, category }) => {
  const coverage = stats[category].total > 0 ? (stats[category].covered / stats[category].total) * 100 : 100;
  const coverageClasses = clsx(
    classes.numbers,
    classes.coverage,
    (coverage >= GOOD_COVERAGE) && classes.good,
    (coverage < GOOD_COVERAGE && coverage >= NORMAL_COVERAGE) && classes.average,
  );

  return (
    <React.Fragment>
      <td className={classes.numbers}>{`${stats[category].covered}/${stats[category].total}`}</td>
      <td className={coverageClasses}>{`${coverage.toFixed(1)}%`}</td>
    </React.Fragment>
  );
};

const NodeStats = ({ tree, coverage }) => {
  const stats = useMemo(() => calculateCoverage(tree, coverage), [tree, coverage]);

  return (
    <React.Fragment>
      <StatColumns stats={stats} category="lines"/>
      <StatColumns stats={stats} category="functions"/>
      <StatColumns stats={stats} category="branches"/>
    </React.Fragment>
  );
};

export default NodeStats;
