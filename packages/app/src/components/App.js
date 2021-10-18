import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CoverageDataProvider from './CoverageDataProvider/CoverageDataProvider';
import LcovImport from './LcovImport/LcovImport';
import Report from './Report/Report';

const App = () => (
  <CoverageDataProvider>
    <BrowserRouter>
      <Route exact path="/">
        <LcovImport/>
      </Route>
      <Route exact path="/report">
        <Report/>
      </Route>
    </BrowserRouter>
  </CoverageDataProvider>
);

export default App;
