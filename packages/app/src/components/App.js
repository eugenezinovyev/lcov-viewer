import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import CoverageDataProvider from './CoverageDataProvider/CoverageDataProvider';
import LcovImport from './LcovImport/LcovImport';
import Report from './Report/Report';

const App = () => (
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
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  </CoverageDataProvider>
);

export default App;
