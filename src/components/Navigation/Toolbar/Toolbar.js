import React from 'react';

import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import classes from './Toolbar.scss';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle drawerToggleClicked={props.sideDrawerToggle}/>
    <div className={classes.Logo}>
      <Logo/>
    </div>
    <NavigationItems
      isAuth={props.isAuth}
      class={classes.DesktopOnly}
    />
  </header>
);

export default toolbar;