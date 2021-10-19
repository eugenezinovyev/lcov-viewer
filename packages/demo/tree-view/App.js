import TreeView from '@lcov-viewer/tree-view';
import React from 'react';
import sample from './sample.json';

const App = () => <TreeView coverage={sample}/>;

export default App;
