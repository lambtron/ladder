/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Input`.
 */

var Input = component()
  .prop('name', { type: 'string' })
  .prop('placeholder', { type: 'string' })
  .prop('defaultValue', { type: 'string' })
  .prop('onInput', { type: 'function' })
  .prop('onChange', { type: 'function' })
  .prop('onValid', { type: 'function' });

/**
 * Expose `Input`.
 */

export default Input;

/**
 * Render `Input`.
 */

Input.prototype.render = function(props, state) {
  var name = props.name;
  var placeholder = props.placeholder || '';
  var defaultValue = props.defaultValue || '';
  var onChange = props.onChange || noop;

  // onInput.
  function onInput(e) {
    var value = e.target.value;
    if (props.onValid) props.onValid(value, name);
    if (props.onInput) props.onInput(e);
  }

  return (
    <input
      type='text'
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange}
      onInput={onInput}
      class='borderless'
      style='width: 100%' />
  );
};

/**
 * Strictly for nooping purposes.
 */

function noop() {};
