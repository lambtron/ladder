/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';

/**
 * Define `Item`.
 */

var Item = component()
  .prop('item', { type: 'object' });

/**
 * Export `Item`.
 */

export default Item;

/**
 * Render `Item`.
 */

Item.prototype.render = function(props, state) {
  var item = props.item;
  var name = item.name;
  var rating = item.rating;

  return (
    <div>
      <span>
        { name }
      </span>
      <span>
        { rating }
      </span>
    </div>
  );
};
