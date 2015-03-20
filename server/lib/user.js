
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
 * Upsert user.
 */

User.create = function *(name) {
  var exists = yield this.findOne({ name: name });
  if (!exists) return yield this.insert(newUser(name));
  return 'User already exists';
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
