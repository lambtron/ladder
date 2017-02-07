/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';
import init from './initialState';

// Handles game related actions
export default function (state = init.games, action) {
  switch (action.type) {
    case types.FETCH_GAMES_SUCCESS:
      return [...state, action.games];
    default:
      return state;
  }
}