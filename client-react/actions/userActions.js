/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

export const fetchUsersAction = () => ({
  type: types.FETCH_USERS_REQUEST
});

export const newUserAction = (payload) => ({
  type: types.NEW_USER_REQUEST,
  payload
});