
/**
 * Module dependencies.
 */

var Elo = require('elo-rank')(15);
var User = require('./user');

/**
 * Expose `Elo`.
 */

module.exports = Elo;

/**
 * Re-rank.
 *
 * @param {String} w winner's username
 * @param {String} l loser's username
 */

Elo.rank = function *(w, l) {
  var winner = yield User.find({ name: w });
  var loser = yield User.find({ name: l });
  if (!winner || !loser) throw 'No user';
  var expectedScoreWinner = elo.getExpected(winner.rating, loser.rating);
  var expectedScoreLoser = elo.getExpected(loser.rating, winner.rating);
  winner.rating = elo.updateRating(expectedScoreWinner, 1, winner.rating);
  loser.rating = elo.updateRating(expectedScoreLoser, 0, loser.rating);
  yield User.insert(winner);
  yield User.insert(loser);
  return;
};
