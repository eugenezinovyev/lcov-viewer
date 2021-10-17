import React, { useMemo } from 'react';
import clsx from 'clsx';
import { BRANCH_NODE } from './coverageTree';
import classes from './NodeStats.module.less';

const GOOD_COVERAGE = 80;
const NORMAL_COVERAGE = 60;

const getCoverageClasses = lineCoverage => clsx(
    classes.numbers,
    classes.coverage,
    (lineCoverage >= GOOD_COVERAGE) && classes.good,
    (lineCoverage < GOOD_COVERAGE && lineCoverage >= NORMAL_COVERAGE) && classes.average
);

const NodeStats = ({ tree, coverage }) => {
    const { lines, functions, branches } = useMemo(() => {
        const aggregateStats = (node) => {
            if (node.type === BRANCH_NODE) {
                const aggregate = {
                    lines: { total: 0, covered: 0 },
                    functions: { total: 0, covered: 0 },
                    branches: { total: 0, covered: 0 },
                };
                
                Object.keys(node.children).forEach((key) => {
                    const sub = aggregateStats(node.children[key]);
                    aggregate.lines.total += sub.lines.total;
                    aggregate.lines.covered += sub.lines.covered;
                    aggregate.functions.total += sub.functions.total;
                    aggregate.functions.covered += sub.functions.covered;
                    aggregate.branches.total += sub.branches.total;
                    aggregate.branches.covered += sub.branches.covered;
                });
                
                return aggregate;
            }

            return coverage[node.path].metrics;
        };

        return aggregateStats(tree);
    }, [coverage, tree]);

    const lineCoverage = lines.total > 0 ? (lines.covered / lines.total) * 100 : 0;
    const functionCoverage = functions.total > 0 ? (functions.covered / functions.total) * 100 : 0;
    const branchCoverage = branches.total > 0 ? (branches.covered / branches.total) * 100 : 0;

    return (
        <React.Fragment>
            <td className={classes.numbers}>{`${lines.covered}/${lines.total}`}</td>
            <td className={getCoverageClasses(lineCoverage)}>{`${lineCoverage.toFixed(1)}%`}</td>
            <td className={classes.numbers}>{`${functions.covered}/${functions.total}`}</td>
            <td className={getCoverageClasses(functionCoverage)}>{`${functionCoverage.toFixed(1)}%`}</td>
            <td className={classes.numbers}>{`${branches.covered}/${branches.total}`}</td>
            <td className={getCoverageClasses(branchCoverage)}>{`${branchCoverage.toFixed(1)}%`}</td>
        </React.Fragment>
    );
};

export default NodeStats;
