/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import SelectList from '../select-list/index.js';
import Button from '../button/index.js';

/**
 * Constants.
 */

const request = require('superagent');

/**
 * Define `Game`.
 */

var Game = component()
  .prop('list', { type: 'array' });

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
    window.location.reload();
  });
};

/**
 * Render `Game`.
 */

Game.prototype.render = function(props, state) {
  var list = props.list;
  var outcome = { winner: 'WINNER', loser: 'LOSER' };
  var self = this;

  // Update selection.
  function update(username, label) {
    outcome[label.toLowerCase()] = username;
  }

  // Submit results.
  function submit() {
    if (outcome.winner === 'WINNER' || outcome.loser === 'LOSER') return console.log('Must select actual player');
    self.results(outcome);
  }

  return (
    <div>
      <div class='col-xs-5'>
        <SelectList label='WINNER' list={list} onChange={update} />
      </div>
      <div class='col-xs-5'>
        <SelectList label='LOSER' list={list} onChange={update} />
      </div>
      <div class='col-xs-2'>
        <span class='btn btn-success' onClick={submit} style='width: 100%'>ADD</span>
      </div>
    </div>
  );
};
