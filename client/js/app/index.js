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
 * Constants.
 */

const request = require('superagent');

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

export default App;

/**
 * After mount.
 */

App.prototype.afterMount = function(el, props, state) {
  var setState = this.setState.bind(this);
  var url = '/api/list';

  // hack for now.
  // var list = [
  //   { name: 'BeastLee', rating: 1500 },
  //   { name: 'DinnerNugget', rating: 1800 },
  //   { name: 'Lambtron', rating: 1200 },
  //   { name: 'Steven', rating: 1100 }
  // ];

  // Sort by rating
  function sortByRating(a, b) {
    return a.rating > b.rating ? -1 : 1;
  }

  // setState({ list: list });
  request.get(url).end(function(err, res) {
    var list = res.body || [];
    list.sort(sortByRating);
    setState({ list: list });
  });
};

/**
 * Render `App`.
 */

App.prototype.render = function(props, state) {
  var list = state.list || [];
  var showPlayer, showGame = false;

  return (
    <div class='' style='font-size: 2em'>
      <div class='container'>
        <div class='row list'>
          <div class='col-xs-12'>
            <List list={list} />
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
        <Game visible={showGame} list={list} />
      </div>
    </div>
  );
};
