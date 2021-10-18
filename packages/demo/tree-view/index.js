import TreeView from '@lcov-viewer/tree-view';
import React from 'react';
import ReactDOM from 'react-dom';
import sample from './sample.json';
import './styles.less';

fetch(sample)
  .then((response) => response.json())
  .then((coverage) => ReactDOM.render(<TreeView coverage={coverage}/>, document.getElementById('root')));
