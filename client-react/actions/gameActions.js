/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

export const fetchGamesAction = () => ({
  type: types.FETCH_GAMES_REQUEST
});

export const newGameAction = (payload) => ({
  type: types.NEW_GAME_REQUEST,
  payload
});