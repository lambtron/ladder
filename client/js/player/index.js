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
  var visible = props.visible || false;
  var username = '';
  var node = ();

  // Get input value.
  function value(value, name) {
    username = value;
  }

  if (visible) {
    node = (
      <div>
        <div>
          <Input name='player' placeholder='username' onValid={ value } />
        </div>
        <div>
          <Button label='CANCEL' />
          <Button label='ADD' onClick=this.create(username) />
        </div>
      </div>
    );
  }

  return node;
};
