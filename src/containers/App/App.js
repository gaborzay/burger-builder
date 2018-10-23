import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

import styles from './App.scss';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Logout from '../Auth/Logout/Logout'
import * as actions from '../../store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('../Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('../Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('../Auth/Auth');
});

class App extends Component {
  componentWillMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div className={styles.app}>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
