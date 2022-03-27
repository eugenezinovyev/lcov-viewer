import { BRANCH_NODE } from '@lcov-viewer/core';
import { collapseRow, expandRow, hideRow, showRow } from '../render/collapse';
import { useEffect, useRef } from 'react';

const findRow = (element) => {
  let current = element;
  
  while (current && current.tagName.toUpperCase() !== 'TR') {
    current = current.parentElement;
  }
  
  return current;
};

const useCollapse = () => {
  const ref = useRef();
  const state = useRef({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    Array.prototype.forEach.call(ref.current.querySelectorAll('tbody tr'), row => {
      const path = row.getAttribute('data-node');
      state.current[path] = { path, row, collapsed: false, visible: true };
    });

    const handleClick = (event) => {
      const toggledRow = findRow(event.target);

      if (!toggledRow || toggledRow.getAttribute('data-node-type') !== BRANCH_NODE) {
        return;
      }

      const toggledPath = toggledRow.getAttribute('data-node');
      const rowState = state.current[toggledPath];
      
      if (rowState.collapsed) {
        expandRow(rowState.row);
      } else {
        collapseRow(rowState.row);
      }
      
      const childrenPaths = Object.keys(state.current).filter(path => path.startsWith(rowState.path) && path !== rowState.path);
      const collapsedChildrenPaths = childrenPaths.filter(path => state.current[path].collapsed);
      const affectedChildrenPaths = childrenPaths
        .filter(path => !collapsedChildrenPaths.find(collapsedChildPath => path.startsWith(collapsedChildPath) && path !== collapsedChildPath));

      affectedChildrenPaths.forEach(path => {
        if (rowState.collapsed) {
          showRow(state.current[path].row);
        } else {
          hideRow(state.current[path].row);
        }
      });

      rowState.collapsed = !rowState.collapsed;
    };

    ref.current.addEventListener('click', handleClick, true);

    return () => {
      ref.current && ref.current.removeEventListener('click', handleClick, true);
      state.current = {};
    };
  }, []);

  return ref;
};

export default useCollapse;
