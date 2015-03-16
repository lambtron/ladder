/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Item`.
 */

var Item = component()
  .prop('player', { type: 'object' });

/**
 * Export `Item`.
 */

export default Item;

/**
 * Render `Item`.
 */

Item.prototype.render = function(props, state) {
  var player = props.player;

  return (
    <div>
      <span>
        {player.name}
      </span>
      <span class='pull-right'>
        {player.rating}
      </span>
    </div>
  );
};
