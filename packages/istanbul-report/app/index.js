import React from 'react';
import ReactDOM from 'react-dom';
import './styles.less';
import Report from './components/Report';

const coverage = COVERAGE_DATA_PLACEHOLDER;

ReactDOM.render(
  <Report coverage={coverage} />,
  document.getElementById('root')
);
