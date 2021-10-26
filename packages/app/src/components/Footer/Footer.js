import { Footer as CommonFooter } from '@lcov-viewer/components';
import React from 'react';
import useCoverageData from '../CoverageDataProvider/useCoverageData';

const Footer = () => {
  const { date } = useCoverageData();

  return (
    <CommonFooter>
      {date && `Report generated at ${date}`}
    </CommonFooter>
  );
};

export default Footer;
