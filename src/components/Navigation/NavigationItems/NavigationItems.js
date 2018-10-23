import React from 'react';
import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <nav className={props.class}>
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuth ?
        <NavigationItem link="/orders">Orders</NavigationItem> :
        null
      }
      {props.isAuth ?
        <NavigationItem link="/logout">Logout</NavigationItem> :
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  </nav>
);

export default navigationItems;