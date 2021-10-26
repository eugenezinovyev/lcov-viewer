import React from 'react';
import classes from './Error.module.less';

const Error = ({ children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

export default Error;
