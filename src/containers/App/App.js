import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import styles from './App.scss';
import Layout from '../../hoc/Layout/Layout';
import Checkout from '../Checkout/Checkout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Orders from '../Orders/Orders';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
