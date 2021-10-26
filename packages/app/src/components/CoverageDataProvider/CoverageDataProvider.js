import React, { useRef } from 'react';
import CoverageDataContext from './CoverageDataContext';

const CoverageDataProvider = ({ children }) => {
  const value = useRef({ data: null, date: '', subscriptions: [] });

  return (
    <CoverageDataContext.Provider value={value}>
      {children}
    </CoverageDataContext.Provider>
  );
};

export default CoverageDataProvider;
