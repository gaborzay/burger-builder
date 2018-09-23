import React, {Component} from 'react';
import styles from './App.scss';

import Layout from '../../components/Layout/Layout';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
