/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `SelectList`.
 */

var SelectList = component()
  .prop('label', { type: 'string' })
  .prop('list', { type: 'array' })
  .prop('onChange', { type: 'function' });

/**
 * Expose `SelectList`.
 */

export default SelectList;

/**
 * Render `SelectList`.
 */

SelectList.prototype.render = function(props, state) {
  var label = props.label;
  var list = props.list;

  // On change.
  function onChange(e) {
    var value = e.target.value;
    if (props.onChange) props.onChange(value, label);
  }

  // Get players.
  var rows = list
    .map(function(player) {
      return (
        <option value={player.name} disabled={player.disabled}>
          {player.name}
        </option>
      );
    });

  return (
    <select value='' onChange={onChange} style='width: 100%'>
      <option selected disabled>
        {label}
      </option>
      {rows}
    </select>
  );
};
