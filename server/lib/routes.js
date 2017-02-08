/**
 * Module dependencies.
 */

var render = require('./render');
var User = require('./user');
var Game = require('./game');
var rank = require('./elo');

/**
 * Render index html page.
 */

exports.index = function *() {
  return this.body = yield render('index');
};

exports.connect = function *() {
  var load = this.request.body,
    user = yield User.findOne({name: load.username, password: load.password});

  if (user) {
    return this.body = {logged: true, admin: user.admin, name: user.name}
  }
  return this.throw('Unknown user', 403);
};

/**
 * User routes
 */

exports.user = {
  /**
   * List users.
   */

  list: function *() {
    return this.body = yield User.find({});
  },

  /**
   * Create user
   */

  create: function *() {
    var load = this.request.body;
    return this.body = yield User.create(load);
  },

  /**
   * Delete user
   */

  remove: function *(name) {
    return this.body = yield User.remove({name: name});
  }
};

/**
 * Game routes
 */
exports.game = {
  /**
   * List games.
   */

  list: function *() {
    return this.body = yield Game.find({}, {sort: {createdAt: -1}});
  },

  /**
   * Get a game
   */

  fetch: function *(id) {
    var game = yield Game.findById(id);
    if (!game) throw this.throw('cannot find that game', 404);
    return this.body = game;
  },

  /**
   * Create a game with results.
   */

  create: function *() {
    var load = this.request.body;
    return this.body = yield rank(load.winner, load.loser);
  },

  /**
   * Delete a game with results.
   */

  delete: function *(id) {
    var res = yield Game.delete(id);

    if (res instanceof TypeError) {
      console.log('throw 400');
      return this.throw(res.message, 400);
    } else if (res instanceof URIError) {
      console.log('throw 404');
      return this.throw(res.message, 404);
    }
    console.log('game removed');
    return this.body = null;
  }
};
