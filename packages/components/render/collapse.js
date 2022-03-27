import rowClasses from './renderRow.module.less';

export const collapseRow = (tr) => { tr && tr.classList.remove(rowClasses.open) };

export const expandRow = (tr) => { tr && tr.classList.add(rowClasses.open) };

export const showRow = (tr) => { tr && tr.classList.remove(rowClasses.hidden) };

export const hideRow = (tr) => { tr && tr.classList.add(rowClasses.hidden) };
