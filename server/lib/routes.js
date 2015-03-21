
/**
 * Module dependencies.
 */

var render = require('./render');
var User = require('./user');
var rank = require('./elo');

/**
 * Render index html page.
 */

exports.index = function *() {
  return this.body = yield render('index');
};

/**
 * List users.
 */

exports.list = function *() {
  return this.body = yield User.find({});
};

/**
 * Create user
 */

exports.create = function *() {
  var load = this.request.body;
  return this.body = yield User.create(load.player);
};

/**
 * Delete user
 */

exports.remove = function *(name) {
  return this.body = yield User.remove({ name: name });
};

/**
 * Submit results.
 */

exports.results = function *() {
  var load = this.request.body;
  return this.body = yield rank(load.winner, load.loser);
};
