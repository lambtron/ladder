/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';

injectTapEventPlugin();

window.onload = () => {
  const store = configureStore();

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
    </Provider>
    , document.getElementById('main'));
};