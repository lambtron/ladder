/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Button`.
 */

var Button = component()
  .prop('label', { type: 'string' })
  .prop('onClick', { type: 'function' });

/**
 * Expose `Button`.
 */

export default Button;

/**
 * Render `Button`.
 */

Button.prototype.render = function(props, state) {
  var label = props.label;
  var onClick = props.onClick;

  return (
    <div class='btn btn-primary' onClick={onClick} style='width: 100%'>
      {label}
    </div>
  );
};
