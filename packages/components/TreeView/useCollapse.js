import { BRANCH_NODE } from '@lcov-viewer/core';
import { useCallback, useEffect, useRef } from 'react';
import { collapseRow, expandRow, hideRow, showRow } from '../render/collapse';

const findRow = (element) => {
  let current = element;
  
  while (current && current.tagName.toUpperCase() !== 'TR') {
    current = current.parentElement;
  }
  
  return current;
};

const makeParentPath = path => path && `${path}/`;

const useCollapse = () => {
  const ref = useRef();
  const state = useRef({});

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    Array.prototype.forEach.call(ref.current.querySelectorAll('tbody tr'), row => {
      const path = row.getAttribute('data-node');
      const type = row.getAttribute('data-node-type');
      state.current[path] = { path, type, row, collapsed: false, visible: true };
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

      const childrenPaths = Object.keys(state.current).filter(path => path.startsWith(makeParentPath(rowState.path)) && path !== rowState.path);
      const collapsedChildrenPaths = childrenPaths.filter(path => state.current[path].collapsed);
      const affectedChildrenPaths = childrenPaths
        .filter(path => !collapsedChildrenPaths
          .find(collapsedChildPath => path.startsWith(makeParentPath(collapsedChildPath)) && path !== collapsedChildPath));

      affectedChildrenPaths.forEach(path => {
        if (rowState.collapsed) {
          showRow(state.current[path].row);
          state.current[path].visible = true;
        } else {
          hideRow(state.current[path].row);
          state.current[path].visible = false;
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

  const onCollapseAll = useCallback(() => {
    Object.values(state.current).forEach(rowState => {
      if (rowState.type === BRANCH_NODE) {
        if (!rowState.collapsed) {
          collapseRow(rowState.row);
          rowState.collapsed = true;
        }
      }
      
      if (rowState.path !== '') {
        hideRow(rowState.row);
        rowState.visible = false;
      }
    });
      
  }, []);

  const onExpandAll = useCallback(() => {
    Object.values(state.current).forEach(rowState => {
      if (rowState.collapsed) {
        expandRow(rowState.row);
        rowState.collapsed = false;
      }

      if (!rowState.visible) {
        showRow(rowState.row);
        rowState.visible = true;
      }
    });
  }, []);

  return [ref, onCollapseAll, onExpandAll];
};

export default useCollapse;
