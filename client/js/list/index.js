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
 * Get players.
 */

List.prototype.players = function() {
  var setState = this.setState;
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

/**
 * Before mount.
 */

List.prototype.beforeMount = function(props, state, prevProps, prevState) {
  console.log('before mount');
  this.players();
};

List.prototype.propsChanged = function(props) {
  console.log('props changed');
};

List.prototype.afterMount = function(el, props, state) {
  console.log('after mount');
  console.log(props);
  console.log(state);
  this.players();
};

List.prototype.beforeUpdate = function(props, state, nextProps, nextState) {
  console.log('before update');
};

List.prototype.afterUpdate = function(props, state, prevProps, prevState) {
  console.log('after update');
};

List.prototype.beforeUnmount = function(el, props, state) {
  console.log('before unmount');
};

List.prototype.afterUnmount = function(props, state) {
  console.log('after unmount');
};

/**
 * Render `List`.
 */

List.prototype.render = function(props, state) {
  var list = props.list || [];

  list = [
    { name: 'BeastLee', rating: 1500 },
    { name: 'DinnerNugget', rating: 1800 },
    { name: 'Lambtron', rating: 1200 },
    { name: 'Steven', rating: 1100 }
  ];

  // Sort by rating
  function sortByRating(a, b) {
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
