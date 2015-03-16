/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import ListItem from '../list-item/index.js';

/**
 * Constants.
 */

const request = require('superagent');

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
 * Before mount.
 */

List.prototype.beforeMount = function(props, state, prevProps, prevState) {
  debugger;
};

List.prototype.propsChanged = function(props) {
  debugger;
};

List.prototype.afterMount = function(el, props, state) {
  debugger;
  var setState = this.setState.bind(this);
  var url = '/api/list';

  // hack for now.
  var list = [
    { name: 'BeastLee', rating: 1500 },
    { name: 'DinnerNugget', rating: 1800 },
    { name: 'Lambtron', rating: 1200 },
    { name: 'Steven', rating: 1100 }
  ];

  setState({ list: list });
  // request.get(url).end(function(err, res) {
    // do something.
    // setState({ list: res.body });
  // });
};

List.prototype.beforeUpdate = function(props, state, nextProps, nextState) {
  debugger;
};

List.prototype.afterUpdate = function(props, state, prevProps, prevState) {
  debugger;
};

List.prototype.beforeUnmount = function(el, props, state) {
  debugger;
};

List.prototype.afterUnmount = function(props, state) {
  debugger
};

/**
 * Render `List`.
 */

List.prototype.render = function(props, state) {
  var list = state.list || [];

  // Sort by rating
  function sortByRating(a, b) {
    debugger;
    return a.rating > b.rating ? -1 : 1;
  }

  // Create rows and sort them by rating
  var rows = list
    .sort(sortByRating)
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
