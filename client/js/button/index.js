/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Constants.
 */

const request = require('superagent');

/**
 * Define `Button`.
 */

var Button = component();

/**
 * Expose `Button`.
 */

export default Button;

/**
 * Render `Button`.
 */

Button.prototype.render = function(props, state) {
  return (
    <div>
      button
    </div>
  );
};

/**
 * Create user.
 */



/**
 * Add game.
 */