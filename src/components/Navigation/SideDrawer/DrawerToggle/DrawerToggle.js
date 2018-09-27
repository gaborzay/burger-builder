import React from 'react'

import classes from './DrawerToggle.scss';

const drawerToggle = (props) => (
  <div
    className={classes.DrawerToggle}
    onClick={props.drawerToggleClicked}
  >
    <div>&nbsp;</div>
    <div>&nbsp;</div>
    <div>&nbsp;</div>
  </div>
);

export default drawerToggle;