/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { put, call } from 'redux-saga/effects';
import { fetchGames, newGame } from '../Api/game';
import * as types from '../constants/actionTypes';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* fetchGamesSaga({}) {
  try {
    const games = yield call(fetchGames);
    yield put({ type: types.FETCH_GAMES_SUCCESS, games });
  } catch (error) {
    yield put({ type: types.FETCH_GAMES_ERROR, error });
  }
}

export function* newGameSaga({payload}) {
  try {
    const game = yield call(newGame, payload);
    yield put({ type: types.NEW_GAME_SUCCESS, game });
    yield put({ type: types.UI_MODAL_NEW_GAME_TOGGLE });
    yield put({ type: types.UI_ADMIN_ACTION_TOGGLE });
  } catch (error) {
    yield put({ type: types.NEW_GAME_ERROR, error });
  }
}