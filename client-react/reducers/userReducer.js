/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';
import init from './initialState';

// Handles user related actions
export default function (state = init.users, action) {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return [...state, ...action.users];
    case types.NEW_USER_SUCCESS:
      return [...state, action.user];
    default:
      return state;
  }
}