/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Input`.
 */

var Input = component()
  .prop('type', { type: 'string' })
  .prop('placeholder', { type: 'string' });

/**
 * Expose `Input`.
 */

export default Input;

/**
 *
 */



/**
 * Render `Input`.
 */

Input.prototype.render = function(props, state) {
  var type = props.type;
  var placeholder = props.placeholder;

  return (
    <input type={ type } placeholder={ placeholder } />
  );
};
