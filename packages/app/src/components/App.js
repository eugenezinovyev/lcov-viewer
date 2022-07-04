import Router from 'preact-router';
import React from 'react';
import CoverageDataProvider from './CoverageDataProvider/CoverageDataProvider';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import LcovImport from './LcovImport/LcovImport';
import Redirect from './Redirect/Redirect';
import Report from './Report/Report';
import classes from './App.module.less';

const App = () => (
  <div className={classes.root}>
    <Header />
    <CoverageDataProvider>
      <Router>
        <LcovImport path="/"/>
        <Report path="/report"/>
        <Redirect default to="/"/>
      </Router>
      <Footer/>
    </CoverageDataProvider>
  </div>
);

export default App;
