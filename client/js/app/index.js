/** @jsx dom */

/**
 * Module dependencies.
 */

import {component,dom} from '../lib/deku/index.js';
import Button from '../button/index.js';
import List from '../list/index.js';

/**
 * Define `App`.
 */

var App = component();

/**
 * Export `App`.
 */

export default App;

/**
 * Render `App`.
 */

App.prototype.render = function(props, state) {
  return (
    <List />
  );
};
