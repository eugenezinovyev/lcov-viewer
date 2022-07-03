import { clsx } from '@lcov-viewer/core';
import React from 'react';
import classes from './LinkButton.module.less';

const LinkButton = ({ children, className, ...props }) => (
  <button className={clsx(classes.root, className)} {...props}>{children}</button>
);

export default LinkButton;
