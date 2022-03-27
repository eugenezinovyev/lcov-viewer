import { buildCoverage, buildCoverageTree, clsx } from '@lcov-viewer/core';
import { route } from 'preact-router';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import readLcov from '../../utils/readLcov';
import useCoverageDataControl from '../CoverageDataProvider/useCoverageDataControl';
import classes from './LcovImport.module.less';

const LcovImport = () => {
  const [error, setError] = useState(undefined);
  const [set] = useCoverageDataControl();
  const onDrop = useCallback((files) => {
    if (files.length <= 0) {
      return;
    }

    readLcov(files[0]).then(
      ([date, coverage]) => {
        set(buildCoverageTree(buildCoverage(coverage)), date);
        route('/report', true);
      },
      ([error, msg]) => {
        console.error(error);
        setError(msg);
      },
    );
  }, [set]);
  const { isDragActive, getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={classes.root}>
      <div className={clsx(classes.dropper, isDragActive && classes.active)} {...getRootProps()}>
        <input {...getInputProps()} />
        <span>Drop your LCOV file here</span>
        {error && <span className={classes.error}>{error}</span>}
      </div>
    </div>
  );
};

export default LcovImport;
