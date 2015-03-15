/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';
import Input from '../input/index.js';

/**
 * Define `NewPlayer`.
 */

var NewPlayer = component();

/**
 * Expose `NewPlayer`.
 */

export default NewPlayer;

/**
 * Create player.
 */

NewPlayer.prototype.create = function(name) {
  var url = '/api/create';
  request.post(url).send({ name: name }).end(function(err, res) {
    // do something.
    // setState({ list: res.body });
  });
};

/**
 * Render `NewPlayer`.
 */

NewPlayer.prototype.render = function(props, state) {


  return (
    <div>
      <Input type='text' />
    </div>
    <div>
      <Button label='CANCEL' />
      <Button label='ADD' onClick=this.create('BeastLee') />
    </div>
  );
};
