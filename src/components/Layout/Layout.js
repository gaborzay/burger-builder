import React from 'react';
//  a reference for the old way export adjacent elements
// import Aux from '../../hoc/Aux';
import classes from './Layout.scss';

const layout = (props) => (
  <React.Fragment>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;