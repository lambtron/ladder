/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import { put, call } from 'redux-saga/effects';
import { fetchUsers, newUser } from '../Api/user';
import * as types from '../constants/actionTypes';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* fetchUsersSaga({}) {
  try {
    const users = yield call(fetchUsers);
    yield put({ type: types.FETCH_USERS_SUCCESS, users });
  } catch (error) {
    yield put({ type: types.FETCH_GAMES_ERROR, error });
  }
}

export function* newUserSaga({payload}) {
  try {
    const user = yield call(newUser, payload);
    yield put({ type: types.NEW_USER_SUCCESS, user });
    yield put({ type: types.UI_MODAL_NEW_USER_TOGGLE });
    yield put({ type: types.UI_ADMIN_ACTION_TOGGLE });
  } catch (error) {
    yield put({ type: types.NEW_USER_ERROR, error });
  }
}