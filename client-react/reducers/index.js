/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { combineReducers } from 'redux';
import users from './userReducer';
import games from './gameReducer';
import ui from './uiReducer';
import profile from './profileReducer';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  users,
  games,
  profile,
  ui
});

export default rootReducer;