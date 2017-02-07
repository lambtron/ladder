/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';

export const connectAction = (payload) => ({
  type: types.PROFILE_CONNECT_REQUEST,
  payload
});

export const logoutAction = () => ({
    type: types.PROFILE_LOGOUT_REQUEST
});