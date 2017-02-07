/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

// Handles user related actions
export default function (state = [], action) {
  switch (action.type) {
    case types.UI_DRAWER_TOGGLE:
      var status = state.drawer ?state.drawer.open : false;
      return {...state, drawer: {open: !status}};
    default:
      return state;
  }
}