import React, {Component} from 'react';
import {connect} from 'react-redux';
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
          isAuth={this.props.isAuth}
          sideDrawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
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

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);