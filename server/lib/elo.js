
/**
 * Module dependencies.
 */

var elo = require('elo-rank')(15);
var User = require('./user');

/**
 * Re-rank.
 *
 * @param {String} w winner's username
 * @param {String} l loser's username
 */

module.exports = function *(w, l) {
  var winner = yield User.findOne({ name: w });
  var loser = yield User.findOne({ name: l });
  if (!winner || !loser) throw 'No user';
  var expectedScoreWinner = elo.getExpected(winner.rating, loser.rating);
  var expectedScoreLoser = elo.getExpected(loser.rating, winner.rating);
  winner.rating = elo.updateRating(expectedScoreWinner, 1, winner.rating);
  loser.rating = elo.updateRating(expectedScoreLoser, 0, loser.rating);
  User.update({ name: winner.name }, winner);
  User.update({ name: loser.name }, loser);
  return;
};
