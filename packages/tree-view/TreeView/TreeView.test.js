import { render, screen } from '@testing-library/react';
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
      lines: { total: 14, covered: 7 },
      functions: { total: 2, covered: 0 },
      branches: { total: 2, covered: 2 },
    },
    path: 'src/components/App.js',
    filename: 'App.js',
  },
};

describe('<TreeView />', () => {
  it('should render all files and subfolders', () => {
    render(<TreeView coverage={coverage}/>);
    expect(screen.getByRole('cell', {  name: /src/i})).toBeTruthy();
    expect(screen.getByRole('cell', {  name: /index.js/i})).toBeTruthy();
    expect(screen.getByRole('cell', {  name: /components/i})).toBeTruthy();
    expect(screen.getByRole('cell', {  name: /App.js/i})).toBeTruthy();
  });
});
