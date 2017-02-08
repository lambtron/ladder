/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';
import init from './initialState';

// Handles user related actions
export default function (state = init.profile, action) {
  let profile = action.profile;
  switch (action.type) {
    case types.PROFILE_CONNECT_SUCCESS:
      return {...state, ...profile};
    case types.PROFILE_LOGOUT_SUCCESS:
      return {...state, ...profile};
    default:
      return state;
  }
}