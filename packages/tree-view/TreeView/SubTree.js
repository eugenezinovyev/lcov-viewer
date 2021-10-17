import React from 'react';
import Node from './Node';

const SubTree = ({ tree, ...props }) => (
    <React.Fragment>
        {Object.keys(tree.children).map((key) => (<Node key={key} name={key} tree={tree.children[key]} {...props} />))}
    </React.Fragment>
);

export default SubTree;
