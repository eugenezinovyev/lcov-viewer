import classes from './renderTable.module.less';

const headCells = [
  `<th class="${classes.title}">File</th>`,
  `<th class="${classes.numbers}">Lines</th>`,
  `<th class="${classes.numbers}">Line Coverage</th>`,
  `<th class="${classes.numbers}">Functions</th>`,
  `<th class="${classes.numbers}">Function Coverage</th>`,
  `<th class="${classes.numbers}">Branches</th>`,
  `<th class="${classes.numbers}">Branch Coverage</th>`,
];

const header = `<thead><tr>${headCells.join('')}</tr></thead>`;
const footer = `<tfoot><tr><td colspan="${headCells.length}" /></tr></tfoot>`;

export const renderTableContents = (bodyCells) => `${header}<tbody>${bodyCells.join('')}</tbody>${footer}`;

const renderTable = (bodyCells) => `<table class="${classes.root}">${renderTableContents(bodyCells)}</table>`;

export default renderTable;
