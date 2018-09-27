import React from 'react';

import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.scss';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer];
  props.open ? attachedClasses.push(classes.Open) : attachedClasses.push(classes.Close);
  return (
    <React.Fragment>
      <Backdrop clicked={props.closed} show={props.open}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <NavigationItems/>
      </div>
    </React.Fragment>
  );
};

export default sideDrawer;