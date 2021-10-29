import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/preact';
import React from 'react';
import mockLcov from '../../mocks/lcov';
import App from './App';

function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, data);
  fireEvent(node, event);
}

const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const mockData = files => ({
  dataTransfer: {
    files,
    items: files.map(file => ({
      kind: 'file',
      type: file.type,
      getAsFile: () => file,
    })),
    types: ['Files'],
  },
});

const queryTableContent = container => [...container.querySelectorAll('tbody > tr')]
  .map(row => [...row.querySelectorAll('td')].map(cell => cell.textContent));

describe('<App />', () => {
  let container = null;
  let queryByText = null;
  const importFile = async (content) => {
    const file = new File([content], 'lcov.info', { type: 'plain/text' });
    const data = mockData([file]);

    dispatchEvt(container.querySelector('input[type="file"]'), 'drop', data);
    await pauseFor(100);
    
    return queryTableContent(container);
  };
  
  beforeEach(() => {
    const result = render(<App/>);
    container = result.container;
    queryByText = result.queryByText;
  });
  
  describe('Absolute path', () => {
    it('should process LCOV with windows paths', async () => {
      const tableContent = await importFile(mockLcov.winAbsolute);

      //@formatter:off
      expect(tableContent).toEqual([
        ['All Files',              '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['C',                      '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['projects',               '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['src',                    '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['CollapseProvider',         '79/79', '100.0%',   '7/7', '100.0%', '17/17', '100.0%'],
        ['CollapseContext.js',         '5/5', '100.0%',   '0/0', '100.0%',   '0/0', '100.0%'],
        ['CollapseProvider.js',      '23/23', '100.0%',   '3/3', '100.0%',   '4/4', '100.0%'],
        ['findNode.js',                '3/3', '100.0%',   '1/1', '100.0%',   '4/4', '100.0%'],
        ['useCollapse.js',           '18/18', '100.0%',   '1/1', '100.0%',   '3/3', '100.0%'],
        ['useCollapsedState.js',     '30/30', '100.0%',   '2/2', '100.0%',   '6/6', '100.0%'],
        ['TreeView',               '186/186', '100.0%', '10/10', '100.0%', '35/35', '100.0%'],
        ['Node.js',                  '58/58', '100.0%',   '4/4', '100.0%', '10/10', '100.0%'],
        ['NodeStats.js',             '63/63', '100.0%',   '4/4', '100.0%', '14/14', '100.0%'],
        ['TreeView.js',              '37/37', '100.0%',   '1/1', '100.0%',   '1/1', '100.0%'],
        ['coverageTree.js',          '28/28', '100.0%',   '1/1', '100.0%', '10/10', '100.0%'],
      ]);
      //@formatter:on
    });

    it('should process LCOV with unix paths', async () => {
      const tableContent = await importFile(mockLcov.unixAbsolute);

      //@formatter:off
      expect(tableContent).toEqual([
        ['All Files',              '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['home',                   '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['projects',               '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['src',                    '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
        ['CollapseProvider',         '79/79', '100.0%',   '7/7', '100.0%', '17/17', '100.0%'],
        ['CollapseContext.js',         '5/5', '100.0%',   '0/0', '100.0%',   '0/0', '100.0%'],
        ['CollapseProvider.js',      '23/23', '100.0%',   '3/3', '100.0%',   '4/4', '100.0%'],
        ['findNode.js',                '3/3', '100.0%',   '1/1', '100.0%',   '4/4', '100.0%'],
        ['useCollapse.js',           '18/18', '100.0%',   '1/1', '100.0%',   '3/3', '100.0%'],
        ['useCollapsedState.js',     '30/30', '100.0%',   '2/2', '100.0%',   '6/6', '100.0%'],
        ['TreeView',               '186/186', '100.0%', '10/10', '100.0%', '35/35', '100.0%'],
        ['Node.js',                  '58/58', '100.0%',   '4/4', '100.0%', '10/10', '100.0%'],
        ['NodeStats.js',             '63/63', '100.0%',   '4/4', '100.0%', '14/14', '100.0%'],
        ['TreeView.js',              '37/37', '100.0%',   '1/1', '100.0%',   '1/1', '100.0%'],
        ['coverageTree.js',          '28/28', '100.0%',   '1/1', '100.0%', '10/10', '100.0%'],
      ]);
      //@formatter:on
    });
  });
  
  describe('Multiple root folders', () => {
    //@formatter:off
    const multiRootTableData = [
      ['All Files',              '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
      ['CollapseProvider',         '79/79', '100.0%',   '7/7', '100.0%', '17/17', '100.0%'],
      ['CollapseContext.js',         '5/5', '100.0%',   '0/0', '100.0%',   '0/0', '100.0%'],
      ['CollapseProvider.js',      '23/23', '100.0%',   '3/3', '100.0%',   '4/4', '100.0%'],
      ['findNode.js',                '3/3', '100.0%',   '1/1', '100.0%',   '4/4', '100.0%'],
      ['useCollapse.js',           '18/18', '100.0%',   '1/1', '100.0%',   '3/3', '100.0%'],
      ['useCollapsedState.js',     '30/30', '100.0%',   '2/2', '100.0%',   '6/6', '100.0%'],
      ['TreeView',               '186/186', '100.0%', '10/10', '100.0%', '35/35', '100.0%'],
      ['Node.js',                  '58/58', '100.0%',   '4/4', '100.0%', '10/10', '100.0%'],
      ['NodeStats.js',             '63/63', '100.0%',   '4/4', '100.0%', '14/14', '100.0%'],
      ['TreeView.js',              '37/37', '100.0%',   '1/1', '100.0%',   '1/1', '100.0%'],
      ['coverageTree.js',          '28/28', '100.0%',   '1/1', '100.0%', '10/10', '100.0%'],
    ];
    //@formatter:on

    it('should process LCOV with relative unix paths', async () => {
      const tableContent = await importFile(mockLcov.unixRelativeMultiRoot);
      expect(tableContent).toEqual(multiRootTableData);
    });

    it('should process LCOV with relative windows paths', async () => {
      const tableContent = await importFile(mockLcov.winRelativeMultiRoot);
      expect(tableContent).toEqual(multiRootTableData);
    });
  });

  describe('Single root folder', () => {
    //@formatter:off
    const singleRootTableData = [
      ['All Files',              '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
      ['src',                    '265/265', '100.0%', '17/17', '100.0%', '52/52', '100.0%'],
      ['CollapseProvider',         '79/79', '100.0%',   '7/7', '100.0%', '17/17', '100.0%'],
      ['CollapseContext.js',         '5/5', '100.0%',   '0/0', '100.0%',   '0/0', '100.0%'],
      ['CollapseProvider.js',      '23/23', '100.0%',   '3/3', '100.0%',   '4/4', '100.0%'],
      ['findNode.js',                '3/3', '100.0%',   '1/1', '100.0%',   '4/4', '100.0%'],
      ['useCollapse.js',           '18/18', '100.0%',   '1/1', '100.0%',   '3/3', '100.0%'],
      ['useCollapsedState.js',     '30/30', '100.0%',   '2/2', '100.0%',   '6/6', '100.0%'],
      ['TreeView',               '186/186', '100.0%', '10/10', '100.0%', '35/35', '100.0%'],
      ['Node.js',                  '58/58', '100.0%',   '4/4', '100.0%', '10/10', '100.0%'],
      ['NodeStats.js',             '63/63', '100.0%',   '4/4', '100.0%', '14/14', '100.0%'],
      ['TreeView.js',              '37/37', '100.0%',   '1/1', '100.0%',   '1/1', '100.0%'],
      ['coverageTree.js',          '28/28', '100.0%',   '1/1', '100.0%', '10/10', '100.0%'],
    ];
    //@formatter:on

    it('should process LCOV with relative unix paths', async () => {
      const tableContent = await importFile(mockLcov.unixRelativeSingleRoot);
      expect(tableContent).toEqual(singleRootTableData);
    });

    it('should process LCOV with relative windows paths', async () => {
      const tableContent = await importFile(mockLcov.winRelativeSingleRoot);
      expect(tableContent).toEqual(singleRootTableData);
    });
  });
  
  it('should reset footer when navigated back to import page', async () => {
    expect(queryByText(/^Report generated at/)).not.toBeInTheDocument();

    await importFile(mockLcov.winAbsolute);
    expect(queryByText(/^Report generated at/)).toBeInTheDocument();

    fireEvent.click(queryByText(/Back/), { role: 'a' });
    expect(queryByText(/^Report generated at/)).not.toBeInTheDocument();
  });
});