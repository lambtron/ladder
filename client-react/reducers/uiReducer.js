/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import * as types from '../constants/actionTypes';
import init from './initialState';

// Handles user related actions
export default function (state = init.ui, action) {
  let modal, status;
  switch (action.type) {
    case types.UI_DRAWER_TOGGLE:
      status = state.drawer ? state.drawer.open : false;
      return {...state, drawer: {open: !status}};
    case types.UI_MODAL_NEW_GAME_TOGGLE:
      modal = {...state.modal, new_game: {open: !state.modal.new_game.open}};
      return {...state, modal: modal};
    case types.UI_MODAL_NEW_USER_TOGGLE:
      modal = {...state.modal, new_user: {open: !state.modal.new_user.open}};
      return {...state, modal: modal};
    case types.UI_MODAL_LOGIN_TOGGLE:
      modal = {...state.modal, login: {open: !state.modal.login.open}};
      return {...state, modal: modal};
    case types.UI_ADMIN_ACTION_TOGGLE:
      status = action.open || !state.admin_actions.open;
      return {...state, admin_actions: {open: status}};
    default:
      return state;
  }
}