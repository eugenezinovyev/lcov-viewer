import { Footer } from '@lcov-viewer/components';
import { createHashHistory } from 'history';
import Router from 'preact-router';
import React from 'react';
import Details from './Details';
import Report from './Report';
import classes from './App.module.less';

const App = ({ date, coverage }) => (
  <div className={classes.root}>
    <Router history={createHashHistory()}>
      <Report path="/" coverage={coverage}/>
      <Details path="/details/:file" coverage={coverage}/>
    </Router>
    <Footer linkHref='https://www.npmjs.com/package/@lcov-viewer/istanbul-report'>
      Report generated at {date}
    </Footer>
  </div>
);

export default App;
