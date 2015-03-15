/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';

/**
 * Define `NewGame`.
 */

var NewGame = component();

/**
 * Expose `NewGame`.
 */

export default NewGame;

/**
 * Submit results.
 */

NewGame.prototype.results = function(outcome) {
  var url = '/api/results';
  request.post(url).send(outcome).end(function(err, res) {
    // do something.
  });
};

/**
 * Render `NewGame`.
 */

NewGame.prototype.render = function(props, state) {
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
