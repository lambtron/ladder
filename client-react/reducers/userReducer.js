/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

// Handles user related actions
export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return [...state, action.users];
    default:
      return state;
  }
}