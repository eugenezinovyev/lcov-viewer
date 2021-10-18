import clsx from 'clsx';
import { source as parseLCOV } from 'lcov-parse';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router-dom';
import buildCoverage from '../../utils/buildCoverage';
import useCoverageDataControl from '../CoverageDataProvider/useCoverageDataControl';
import classes from './LcovImport.module.less';

const LcovImport = () => {
  const [error, setError] = useState(undefined);
  const [set] = useCoverageDataControl();
  const history = useHistory();
  const onError = useCallback((error, msg) => {
    console.error(error);
    setError(msg);
  }, []);
  const onDrop = useCallback((files) => {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const lcovContent = reader.result;
        parseLCOV(lcovContent, (error, data) => {
          if (error) {
            onError(error, 'Failed to parse file');
          } else {
            set(buildCoverage(data));
            history.push('/report');
          }
        });
      };
      reader.onerror = () => onError(reader.error, 'Failed to read file');
      reader.readAsText(files[0]);
    }
  }, [set, onError, location]);
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
