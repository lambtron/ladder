/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { takeLatest } from 'redux-saga';
import { fetchUsersSaga } from './userSaga';
import { fetchGamesSaga } from './gameSaga';
import { connectSaga, logoutSaga } from './profileSaga';
import * as types from '../constants/actionTypes';

exports.watchFetchUsers = function* () {
  yield* takeLatest(types.FETCH_USERS_REQUEST, fetchUsersSaga);
};

exports.watchFetchGames = function* () {
  yield* takeLatest(types.FETCH_GAMES_REQUEST, fetchGamesSaga);
};

exports.watchConnect = function* () {
  yield* takeLatest(types.PROFILE_CONNECT_REQUEST, connectSaga);
};

exports.watchLogout = function* () {
  yield* takeLatest(types.PROFILE_LOGOUT_REQUEST, logoutSaga);
};