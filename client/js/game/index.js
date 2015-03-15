/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';

/**
 * Constants.
 */

const request = require('superagent');

/**
 * Define `Game`.
 */

var Game = component()
  .prop('visible', { type: 'boolean' });

/**
 * Expose `Game`.
 */

export default Game;

/**
 * Submit results.
 */

Game.prototype.results = function(outcome) {
  var url = '/api/results';
  request.post(url).send(outcome).end(function(err, res) {
    // do something.
  });
};

/**
 * Render `Game`.
 */

Game.prototype.render = function(props, state) {
  var outcome = {
    winner: 'BeastLee',
    loser: 'DinnerNugget'
  };

  return (
    <div>
      Winner
    </div>
    <div>
      Loser
    </div>
    <div>
      <Button label='SUBMIT' onClick=this.results(outcome) />
    </div>
  );
};
