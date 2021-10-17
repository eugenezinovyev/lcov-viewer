import React from 'react';
import CollapseProvider from '../CollapseProvider/CollapseProvider';
import SubTree from './SubTree';
import classes from './TreeView.module.less';
import { buildCoverageTree } from './coverageTree';

const TreeView = ({ coverage }) => {
    const tree = buildCoverageTree(coverage);

    return (
        <CollapseProvider tree={tree}>
            <table className={classes.root}>
                <thead>
                <tr>
                    <th className={classes.title}>File</th>
                    <th className={classes.numbers}>Lines</th>
                    <th className={classes.numbers}>Line Coverage</th>
                    <th className={classes.numbers}>Functions</th>
                    <th className={classes.numbers}>Function Coverage</th>
                    <th className={classes.numbers}>Branches</th>
                    <th className={classes.numbers}>Branch Coverage</th>
                </tr>
                </thead>
                <tbody>
                <SubTree tree={tree} coverage={coverage}/>
                </tbody>
            </table>
        </CollapseProvider>
    );
};

export default TreeView;
