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

var Button = component()
  .prop('label', { type: 'string' });

/**
 * Expose `Button`.
 */

export default Button;

/**
 * Render `Button`.
 */

Button.prototype.render = function(props, state) {
  var label = props.label;

  return (
    <div class='btn'>
      { label }
    </div>
  );
};
