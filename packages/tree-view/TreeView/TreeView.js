import React from 'react';
import CollapseProvider from '../CollapseProvider/CollapseProvider';
import { buildCoverageTree } from './coverageTree';
import Node from './Node';
import classes from './TreeView.module.less';

const TreeView = ({ coverage, lineTitle }) => {
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
        <Node name={tree.name} tree={tree} coverage={coverage} lineTitle={lineTitle}/>
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={7}/>
        </tr>
        </tfoot>
      </table>
    </CollapseProvider>
  );
};

const LineTitle = ({ name }) => (name);

TreeView.defaultProps = {
  lineTitle: LineTitle,
};

export default TreeView;
