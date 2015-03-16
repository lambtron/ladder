/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Player from '../player/index.js';
import Button from '../button/index.js';
import Game from '../game/index.js';
import List from '../list/index.js';

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

export default App;

/**
 * Render `App`.
 */

App.prototype.render = function(props, state) {
  var showPlayer, showGame = false;

  return (
    <div class='' style='font-size: 2em'>
      <div class='container'>
        <div class='row list'>
          <div class='col-xs-12'>
            <List />
          </div>
        </div>
        <br />
        <div class='row'>
          <div class='col-xs-6'>
            <Button label='NEW PLAYER' onClick={showPlayer = !showPlayer} />
          </div>
          <div class='col-xs-6'>
            <Button label='NEW GAME' onClick={showGame = !showGame} />
          </div>
        </div>
      </div>

      <div class='container'>
        <Player visible={showPlayer} />
      </div>
      <div class='container'>
        <Game visible={showGame} />
      </div>
    </div>
  );
};
