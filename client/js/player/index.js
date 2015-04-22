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

Player.prototype.create = function(player) {
  var url = '/api/create';
  request.post(url).send({ player }).end(function(err, res) {
    window.location.reload();
  });
};

/**
 * Render `Player`.
 */

Player.prototype.render = function(props, state) {
  var self = this;
  var player = { name: '', gif: '' };

  // Get input value.
  function value(value, name) {
    if (name === 'player') player.name = value;
    if (name === 'gif') player.gif = value;
  }

  // Create player.
  function create() {
    if (player.name.length === 0) return console.log('Username must not be blank');
    self.create(player);
  }

  return (
    <div>
      <div class='col-xs-5'>
        <Input name='player' placeholder='new username' onValid={value} />
      </div>
      <div class='col-xs-5'>
        <Input name='gif' placeholder='your gif' onValid={value} />
      </div>
      <div class='col-xs-2'>
        <span class='glyphicon glyphicon-plus pull-right pointer' onClick={create}></span>
      </div>
    </div>
  );
};
