/**
 * Module dependencies.
 */

import {component,dom} from './deku/index.js';

/**
 * Define `Button`.
 */

var Button = component();

/**
 * Expose `Button`.
 */

Button.prototype.render = function(props, state) {

  /**
   * Click handler.
   */

  function onClick(e){
   console.log('Clicked!');
  }

  return dom('button', { onClick: this.onClick }, 'Click me');
};

/**
 * Expose `Button`.
 */

export default Button;
