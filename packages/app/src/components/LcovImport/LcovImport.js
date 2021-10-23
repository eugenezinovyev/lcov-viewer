import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import buildCoverage from '../../utils/buildCoverage';
import readLcov from '../../utils/readLcov';
import useCoverageDataControl from '../CoverageDataProvider/useCoverageDataControl';
import classes from './LcovImport.module.less';

const LcovImport = () => {
  const [error, setError] = useState(undefined);
  const [set] = useCoverageDataControl();
  const history = useHistory();
  const onDrop = useCallback((files) => {
    if (files.length <= 0) {
      return;
    }

    readLcov(files[0]).then(
      (coverage) => {
        set(buildCoverage(coverage));
        history.push('/report');
      },
      ([error, msg]) => {
        console.error(error);
        setError(msg);
      },
    );
  }, [set, history]);
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
