/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

// Handles game related actions
export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_GAMES_SUCCESS:
      return [...state, action.games];
    default:
      return state;
  }
}