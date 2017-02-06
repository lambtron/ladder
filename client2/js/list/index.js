/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import ListItem from '../list-item/index.js';

/**
 * Define `List`.
 */

var List = component()
  .prop('list', { type: 'array' });

/**
 * Expose `List`.
 */

export default List;

/**
 * Render `List`.
 */

List.prototype.render = function(props, state) {
  var list = props.list || [];

  // Create rows.
  var rows = list
    .map(function(player) {
      return (
        <ListItem player={player} />
      );
    });

  // Return rows.
  return (
    <div>
      {rows}
    </div>
  );
};
