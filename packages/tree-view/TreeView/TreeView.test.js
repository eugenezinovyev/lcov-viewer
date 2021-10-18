import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import TreeView from './TreeView';

const coverage = {
  'src/index.js': {
    metrics: {
      lines: { total: 6, covered: 0 },
      functions: { total: 0, covered: 0 },
      branches: { total: 0, covered: 0 },
    },
    path: 'src/index.js',
    filename: 'index.js',
  },
  'src/components/App.js': {
    metrics: {
      lines: { total: 14, covered: 9 },
      functions: { total: 2, covered: 0 },
      branches: { total: 2, covered: 2 },
    },
    path: 'src/components/App.js',
    filename: 'App.js',
  },
};

const queryTableContent = container => [...container.querySelectorAll('tbody > tr')]
  .map(row => [...row.querySelectorAll('td')].map(cell => cell.textContent));
const queryRows = container => [...container.querySelectorAll('tbody > tr > td:first-child')].map(cell => cell.textContent);

const clickRow = (container, title) => fireEvent.click([...container.querySelectorAll('tbody > tr')]
  .find(row => row.querySelector('td:first-child').textContent === title));

describe('<TreeView />', () => {
  it('should render coverage for each directory and file', () => {
    const { container } = render(<TreeView coverage={coverage}/>);

    //@formatter:off
    expect(queryTableContent(container)).toEqual([
      ['All Files',  '9/20', '45.0%', '0/2',   '0.0%', '2/2', '100.0%'],
      ['src',        '9/20', '45.0%', '0/2',   '0.0%', '2/2', '100.0%'],
      ['index.js',    '0/6',  '0.0%', '0/0', '100.0%', '0/0', '100.0%'],
      ['components', '9/14', '64.3%', '0/2',   '0.0%', '2/2', '100.0%'],
      ['App.js',     '9/14', '64.3%', '0/2',   '0.0%', '2/2', '100.0%'],
    ]);
    //@formatter:on
  });

  it('should toggle child rows visibility on directory row click', () => {
    const { container } = render(<TreeView coverage={coverage}/>);
    expect(queryRows(container)).toEqual(['All Files', 'src', 'index.js', 'components', 'App.js']);

    clickRow(container, 'All Files');
    expect(queryRows(container)).toEqual(['All Files']);

    clickRow(container, 'All Files');
    expect(queryRows(container)).toEqual(['All Files', 'src', 'index.js', 'components', 'App.js']);
  });

  it('should persist child row visibility on parent row visibility change', () => {
    const { container } = render(<TreeView coverage={coverage}/>);
    expect(queryRows(container)).toEqual(['All Files', 'src', 'index.js', 'components', 'App.js']);

    clickRow(container, 'components');
    expect(queryRows(container)).toEqual(['All Files', 'src', 'index.js', 'components']);

    clickRow(container, 'src');
    expect(queryRows(container)).toEqual(['All Files', 'src']);

    clickRow(container, 'src');
    expect(queryRows(container)).toEqual(['All Files', 'src', 'index.js', 'components']);
  });
});
