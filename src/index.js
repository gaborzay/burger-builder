import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.scss';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './store/reducers/auth';
import orderReducer from './store/reducers/order';
import burgerBuilderReducer from './store/reducers/burgerBuilder';

const composeEnhancers = process.env.NODE_ENV  === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : null;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
