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
  .prop('visible', { type: 'boolean' })
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
    // do something.
  });
};

/**
 * Render `Game`.
 */

Game.prototype.render = function(props, state) {
  var visible = props.visible;
  var list = props.list;
  var outcome = {};
  var self = this;

  // Update selection.
  function update(username, label) {
    outcome[label.toLowerCase()] = username;
    // find username in list and disable it.
  }

  // Submit results.
  function submit() {
    self.results(outcome);
  }

  // hack for now.
  list = [
    { name: 'BeastLee', rating: 1500, disabled: false },
    { name: 'DinnerNugget', rating: 1800, disabled: false },
    { name: 'Lambtron', rating: 1200, disabled: false },
    { name: 'Steven', rating: 1100, disabled: false }
  ];

  return (
    <div>
      <span>
        <SelectList label='WINNER' list={list} onChange={update} />
      </span>
      <span>
        <SelectList label='LOSER' list={list} onChange={update} />
      </span>
      <div>
        <Button label='SUBMIT' onClick={submit} />
      </div>
    </div>
  );
};
