import React, { useMemo } from 'react';
import buildTableRowsData from '../render/buildTableRowsData';
import LinkButton from '../LinkButton/LinkButton';
import renderRow from '../render/renderRow';
import renderTable from '../render/renderTable';
import useCollapse from './useCollapse';
import classes from './TreeView.module.less';

const TreeView = ({ coverage, linkSelector }) => {
  const [collapseContainer, onCollapseAll, onExpandAll] = useCollapse();
  const tableHTML = useMemo(() => {
    const rows = buildTableRowsData(coverage);
    const bodyContent = rows.map(row => renderRow(row, { linkSelector }));
    
    return { __html: renderTable(bodyContent) };
  }, [coverage, linkSelector]);


  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <LinkButton onClick={onCollapseAll}>Collapse All</LinkButton>
        <LinkButton onClick={onExpandAll}>Expand All</LinkButton>
      </div>
      <div dangerouslySetInnerHTML={tableHTML} ref={collapseContainer}/>
    </div>
  );
};

export default TreeView;
