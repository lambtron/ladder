
/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
var User = wrap(db.get('user'));

/**
 * Expose `User`.
 */

module.exports = User;

/**
 * Create user.
 */

User.create = function *(name) {
  return yield this.insert(newUser(name));
};

/**
 * Return new user object.
 */

function newUser(name) {
  return {
    name: name || '',
    rating: 1500,
    createdAt: Date.now()
  };
}
