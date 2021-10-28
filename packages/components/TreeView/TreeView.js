import React, { useMemo } from 'react';
import { buildTableRowsData, renderRow, renderTable } from '@lcov-viewer/core';
import useCollapse from './useCollapse';
import classes from './TreeView.module.less';

const TreeView = ({ coverage, linkSelector }) => {
  const collapseContainer = useCollapse();
  const tableHTML = useMemo(() => {
    const rows = buildTableRowsData(coverage);
    const bodyContent = rows.map(row => renderRow(row, { linkSelector }));
    
    return { __html: renderTable(bodyContent) };
  }, [coverage, linkSelector]);


  return <div className={classes.root} dangerouslySetInnerHTML={tableHTML} ref={collapseContainer}/>;
};

export default TreeView;