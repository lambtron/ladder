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

var Player = component()
  .prop('visible', { type: 'boolean' });

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
  var visible = props.visible || false;

  // Get input value.
  function value(value, name) {
    username = value;
  }

  // Create player.
  function create() {
    self.create(username);
  }

  // Cancel.
  function cancel() {
    // cancel.
  }

  return (
    <div>
      <div class='row'>
        <div class='col-xs-12'>
          <Input name='player' placeholder='username' onValid={value} />
        </div>
      </div>
      <div class='row'>
        <div class='col-xs-6'>
          <Button label='CANCEL' onClick={cancel} />
        </div>
        <div class='col-xs-6'>
          <Button label='ADD' onClick={create} />
        </div>
      </div>
    </div>
  );
};
