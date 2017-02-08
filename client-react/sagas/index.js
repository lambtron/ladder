/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import {fork} from 'redux-saga/effects';
import {watchFetchUsers, watchNewUser, watchFetchGames, watchNewGame, watchConnect, watchLogout} from './watchers';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* startForman() {
  yield [
    fork(watchFetchUsers),
    fork(watchNewUser),
    fork(watchFetchGames),
    fork(watchNewGame),
    fork(watchConnect),
    fork(watchLogout),
  ];
}