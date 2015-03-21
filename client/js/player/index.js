/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';
import Input from '../input/index.js';

/**
 * Constants.
 */

const request = require('superagent');

/**
 * Define `Player`.
 */

var Player = component();

/**
 * Expose `Player`.
 */

export default Player;

/**
 * Create player.
 */

Player.prototype.create = function(name) {
  var url = '/api/create';
  request.post(url).send({ name: name }).end(function(err, res) {
    // do something.
    // setState({ list: res.body });
  });
};

/**
 * Render `Player`.
 */

Player.prototype.render = function(props, state) {
  var self = this;
  var username = '';

  // Get input value.
  function value(value, name) {
    username = value;
  }

  // Create player.
  function create() {
    if (username.length === 0) return console.log('Username must not be blank');
    self.create(username);
  }

  // Cancel.
  function cancel() {
    // cancel.
  }

  return (
    <div>
      <div class='col-xs-9'>
        <Input name='player' placeholder='new username here' onValid={value} />
      </div>
      <div class='col-xs-3'>
        <span class='glyphicon glyphicon-plus pull-right pointer' onClick={create}></span>
      </div>
    </div>
  );
};
