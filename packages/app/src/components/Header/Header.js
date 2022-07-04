import React from 'react';
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import classes from './Header.module.css';
import icon from '../../../../../icon-240x240.svg';

const Header = () => {
  return (
    <header className={classes.root}>
      <img width={48} height={48} className={classes.icon} src={icon} alt="icon"/>
      <h1 className={classes.title}>LCOV Viewer</h1>
      <div className={ classes.links }>
        <a rel="noreferrer" target="_blank" className={ classes.npm } href="https://www.npmjs.com/package/@lcov-viewer/istanbul-report">
          <FontAwesomeSvgIcon icon={ faNpm }/>
        </a>
        <a rel="noreferrer" target="_blank" className={ classes.github } href="https://github.com/eugenezinovyev/lcov-viewer">
          <FontAwesomeSvgIcon icon={ faGithub }/>
        </a>
      </div>
    </header>
  );
};

export default Header;
