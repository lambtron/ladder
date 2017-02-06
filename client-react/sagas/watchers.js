/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { takeLatest } from 'redux-saga';
import { fetchUsersSaga } from './userSaga';
import { fetchGamesSaga } from './gameSaga';
import * as types from '../constants/actionTypes';

export default function* watchFetchUsers() {
  yield* takeLatest(types.FETCH_USERS_REQUEST, fetchUsersSaga);
}

export default function* watchFetchGames() {
  yield* takeLatest(types.FETCH_GAMEs_REQUEST, fetchGamesSaga);
}
