import React from 'react';
import classes from './Footer.module.less';

const Footer = ({ linkHref, children }) => (
  <div className={classes.root}>
    <a href={linkHref} target="_blank">LCOV Viewer</a>
    {children && <span>{children}</span>}
  </div>
);

Footer.defaultProps = {
  linkHref: 'https://github.com/eugenezinovyev/lcov-viewer',
};

export default Footer;
