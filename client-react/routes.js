/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import UsersPage from './components/UsersPage';
import GamesPage from './components/GamesPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={UsersPage}/>
    <Route path="game" component={GamesPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;