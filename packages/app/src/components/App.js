import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CoverageDataProvider from './CoverageDataProvider/CoverageDataProvider';
import Footer from './Footer/Footer';
import LcovImport from './LcovImport/LcovImport';
import Report from './Report/Report';
import classes from './App.module.less';

const App = () => (
  <div className={classes.root}>
    <CoverageDataProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LcovImport/>
          </Route>
          <Route exact path="/report">
            <Report/>
          </Route>
          <Route>
            <Redirect to="/"/>
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer/>
    </CoverageDataProvider>
  </div>
);

export default App;
