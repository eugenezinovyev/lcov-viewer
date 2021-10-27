import { createHashHistory } from 'history';
import Router from 'preact-router';
import React from 'react';
import CoverageDataProvider from './CoverageDataProvider/CoverageDataProvider';
import Footer from './Footer/Footer';
import LcovImport from './LcovImport/LcovImport';
import Report from './Report/Report';
import classes from './App.module.less';

const App = () => (
  <div className={classes.root}>
    <CoverageDataProvider>
      <Router history={createHashHistory()}>
        <LcovImport path="/"/>
        <Report path="/report"/>
      </Router>
      <Footer/>
    </CoverageDataProvider>
  </div>
);

export default App;
