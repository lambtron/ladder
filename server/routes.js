
/**
 * Module dependencies.
 */

var render = require('../lib/render');
var User = require('../lib/user');
var elo = require('../lib/elo');

/**
 * Render index html page.
 */

exports.index = function *() {
  this.body = yield render('index');
};

/**
 * Create user
 */

exports.create = function *() {
  var load = {
    name: 'BeastLee'
  };

  var user = {
    name: load.name,
    rating: 1000
  };

  return yield User.insert(user);
};

/**
 * Delete user
 */

exports.remove = function *() {
  var user = {
    name: 'BeastLee'
  };

  return User.remove({ name: user.name });
};

/**
 * Submit results.
 */

exports.results = function *() {
  var load = {
    winner: 'BeastLee',
    loser: 'DinnerNugget'
  };

  return yield elo.rank(load.winner, load.loser);
};
