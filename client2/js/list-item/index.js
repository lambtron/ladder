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
 * Get gif.
 */

Item.prototype.gif = function() {
  return 'http://media.giphy.com/media/wvU4jl82C9cis/giphy.gif';
};

/**
 * Render `Item`.
 */

Item.prototype.render = function(props, state) {
  var player = props.player;
  player.gif = player.gif || this.gif();

  return (
    <div style='margin: 10px 0px 10px 0px'>
      <span>
        <img src={player.gif} style='margin-right: 10px; width: 26px; height: 26px; -moz-border-radius: 13px; border-radius: 13px;' />
      </span>
      <span style='vertical-align: middle'>
        {player.name}
      </span>
      <span class='pull-right'>
        {player.rating}
      </span>
    </div>
  );
};
