/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { combineReducers } from 'redux';
import users from './userReducer';
import games from './gameReducer';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  users,
  games
});

export default rootReducer;