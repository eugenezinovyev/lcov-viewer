import { CoverageIndicator, Summary } from '@lcov-viewer/components';
import React from 'react';
import PrismCode from 'react-prism/lib/components/PrismCode';
import classes from './Details.module.less';

const Details = ({ coverage, file }) => {
  const { metrics, details } = coverage[file] || {};
  
  if (!details || !details.lines || !details.lines.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Summary metrics={metrics}>
        <a href="/">All Files</a>
        <span>/</span>
        <span>{file}</span>
      </Summary>
      <CoverageIndicator metrics={metrics.lines} />
      <div className={classes.codeContainer}>
        <div className={classes.lineNumbers}>
          {details.lines.map(({ line, hits }) => (
            <span key={line} className={line !== details.lines.length && (hits > 0 ? classes.hit : classes.notHit)}>
              {line}
            </span>
          ))}
        </div>
        <div className={classes.hits}>
          {details.lines.map(({ line, hits }) => (
            <span key={line} className={line !== details.lines.length && (hits > 0 ? classes.hit : classes.notHit)}>
              {hits > 0 ? `${hits}x` : '\u00A0'}
            </span>
          ))}
        </div>
        <div className={classes.code}>
          <PrismCode component="pre" className="language-javascript code">
            {details.lines.map(line => line.text).join('\n')}
          </PrismCode>
        </div>
      </div>
    </div>
  );
};

export default Details;
