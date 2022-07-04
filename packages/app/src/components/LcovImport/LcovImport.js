import { buildCoverage, buildCoverageTree, clsx } from '@lcov-viewer/core';
import { route } from 'preact-router';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import readLcov from '../../utils/readLcov';
import useCoverageDataControl from '../CoverageDataProvider/useCoverageDataControl';
import classes from './LcovImport.module.less';
import demoImage from '../../images/demo.png';

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
      <div className={clsx(classes.column, classes.infoColumn)}>
        <h3>More convenient way to review your test coverage</h3>
        <p>Group coverage by directory, collapse inessential, expand what's important.</p>
        <img width={581} height={393} src={demoImage} alt="demo" />
        <h4>Other ways to get report</h4>
        <div className={classes.packages}>
          <a rel="noreferrer" target="_blank" href="https://www.npmjs.com/package/@lcov-viewer/istanbul-report">@lcov-viewer/istanbul-report</a>
          <span>Istanbul reporter with grouped HTML report output including per-file line coverage.</span>
          <a rel="noreferrer" target="_blank" href="https://www.npmjs.com/package/@lcov-viewer/cli">@lcov-viewer/cli</a>
          <span>CLI to convert lcov.info file into grouped HTML report.</span>
        </div>
      </div>
      <div className={clsx(classes.column, classes.dropColumn)}>
        <div className={clsx(classes.dropper, isDragActive && classes.active)} {...getRootProps()}>
          <input {...getInputProps()} />
          <span>Drop your LCOV file here</span>
          <span>&mdash;&nbsp;or&nbsp;&mdash;</span>
          <span>Click to open file</span>
          {error && <span className={classes.error}>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default LcovImport;
