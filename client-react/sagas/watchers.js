/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { takeLatest } from 'redux-saga';
import { fetchUsersSaga, newUserSaga } from './userSaga';
import { fetchGamesSaga, newGameSaga } from './gameSaga';
import { connectSaga, logoutSaga } from './profileSaga';
import * as types from '../constants/actionTypes';

exports.watchFetchUsers = function* () {
  yield* takeLatest(types.FETCH_USERS_REQUEST, fetchUsersSaga);
};
exports.watchNewUser = function* () {
  yield* takeLatest(types.NEW_USER_REQUEST, newUserSaga);
};

exports.watchFetchGames = function* () {
  yield* takeLatest(types.FETCH_GAMES_REQUEST, fetchGamesSaga);
};
exports.watchNewGame = function* () {
  yield* takeLatest(types.NEW_GAME_REQUEST, newGameSaga);
};

exports.watchConnect = function* () {
  yield* takeLatest(types.PROFILE_CONNECT_REQUEST, connectSaga);
};

exports.watchLogout = function* () {
  yield* takeLatest(types.PROFILE_LOGOUT_REQUEST, logoutSaga);
};