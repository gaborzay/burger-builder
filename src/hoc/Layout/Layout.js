import React, {Component} from 'react';
//  a reference for the old way export adjacent elements
// import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.scss';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) =>
      ({showSideDrawer: !prevState.showSideDrawer})
    );
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          sideDrawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;