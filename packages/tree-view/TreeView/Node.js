import clsx from 'clsx';
import React from 'react';
import useCollapse from '../CollapseProvider/useCollapse';
import useCollapsedState from '../CollapseProvider/useCollapsedState';
import { BRANCH_NODE } from './coverageTree';
import classes from './Node.module.less';
import NodeStats from './NodeStats';

const paddingCache = {};
const calculatePadding = (depth) => {
  if (!Object.hasOwnProperty.call(paddingCache, depth)) {
    paddingCache[depth] = { paddingLeft: depth * 20 + 4 };
  }

  return paddingCache[depth];
};

const LeafNode = ({ name, tree, coverage, depth }) => (
  <tr className={classes.root}>
    <td className={classes.title} style={calculatePadding(depth)}>
      {name}
    </td>
    <NodeStats tree={tree} coverage={coverage}/>
  </tr>
);

const BranchNode = ({ name, tree, coverage, depth }) => {
  const toggleCollapsed = useCollapse(tree.path);
  const collapsed = useCollapsedState(tree.path);
  const nodeClasses = clsx(classes.root, classes.folder, !collapsed && classes.open);

  return (
    <React.Fragment>
      <tr className={nodeClasses} onClick={toggleCollapsed} role="group">
        <td className={classes.title} style={calculatePadding(depth)}>
          {name}
        </td>
        <NodeStats tree={tree} coverage={coverage}/>
      </tr>
      {!collapsed && (
        Object.keys(tree.children).map((key) => <Node key={key} name={key} tree={tree.children[key]} coverage={coverage} depth={depth + 1}/>)
      )}
    </React.Fragment>
  );
};

const Node = ({ name, tree, coverage, depth }) => {
  return tree.type === BRANCH_NODE
    ? <BranchNode name={name} tree={tree} coverage={coverage} depth={depth}/>
    : <LeafNode name={name} tree={tree} coverage={coverage} depth={depth}/>;
};

Node.defaultProps = {
  depth: 0,
  collapsed: false,
};

export default Node;
