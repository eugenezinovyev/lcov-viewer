import React from 'react';
import { BRANCH_NODE } from '../TreeView/coverageTree';
import CollapseContext from './CollapseContext';

const buildState = (node) => Object.keys(node.children).reduce((memo, key) => {
  if (node.children[key].type === BRANCH_NODE) {
    memo.children[key] = buildState(node.children[key]);
  }

  return memo;
}, { children: {}, collapsed: false });

const CollapseProvider = ({ tree, children }) => {
  const value = { subscriptions: {}, state: buildState(tree) };

  return (
    <CollapseContext.Provider value={value}>
      {children}
    </CollapseContext.Provider>
  );
};

export default CollapseProvider;
