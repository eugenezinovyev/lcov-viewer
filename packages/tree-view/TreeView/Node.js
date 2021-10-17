import React from 'react';
import clsx from 'clsx';
import { BRANCH_NODE } from './coverageTree';
import NodeStats from './NodeStats';
import SubTree from './SubTree';
import useCollapse from '../CollapseProvider/useCollapse';
import useCollapsedState from '../CollapseProvider/useCollapsedState';
import classes from './Node.module.less';

const paddingCache = {};
const calculatePadding = (depth) => {
    if (!Object.hasOwnProperty.call(paddingCache, depth)) {
        paddingCache[depth] = { paddingLeft: depth * 20 + 4 };
    }
    
    return paddingCache[depth];
};

const LeafNode = ({ name, tree, coverage, depth, collapsed: parentCollapsed }) => {
    return (
        <React.Fragment>
            <tr className={clsx(classes.root, parentCollapsed && classes.hidden)}>
                <td className={classes.title} style={calculatePadding(depth)}>
                    {name}
                </td>
                <NodeStats tree={tree} coverage={coverage} />
            </tr>
        </React.Fragment>
    );
};

const BranchNode = ({ name, tree, coverage, depth, collapsed: parentCollapsed }) => {
    const toggleCollapsed = useCollapse(tree.path);
    const collapsed = useCollapsedState(tree.path);
    const nodeClasses = clsx(classes.root, classes.folder, parentCollapsed && classes.hidden, !collapsed && classes.open);

    return (
        <React.Fragment>
            <tr className={nodeClasses} onClick={toggleCollapsed} role="group">
                <td className={classes.title} style={calculatePadding(depth)}>
                    {name}
                </td>
                <NodeStats tree={tree} coverage={coverage} />
            </tr>
            {<SubTree tree={tree} coverage={coverage} depth={depth+1} collapsed={parentCollapsed || collapsed} />}
        </React.Fragment>
    );
};

const Node = ({ name, tree, coverage, depth, collapsed }) => {
    return tree.type === BRANCH_NODE
        ? <BranchNode name={name} tree={tree} coverage={coverage} depth={depth} collapsed={collapsed} />
        : <LeafNode name={name} tree={tree} coverage={coverage} depth={depth} collapsed={collapsed} />;
};

Node.defaultProps = {
    depth: 0,
    collapsed: false,
};

export default Node;
