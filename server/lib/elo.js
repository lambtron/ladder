
/**
 * Module dependencies.
 */

var elo = require('elo-rank')(15);
var User = require('./user');
var Game = require('./game');

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
  var game = {
    winner: { name: winner.name, old: winner.rating },
    loser: { name: loser.name, old: loser.rating }
  };
  var ratings = getNewRatings(winner.rating, loser.rating);
  winner.rating = ratings.winner;
  loser.rating = ratings.loser;
  winner.games++;
  loser.games++;
  game.winner.new = winner.rating;
  game.loser.new = loser.rating;
  User.update({ name: winner.name }, winner);
  User.update({ name: loser.name }, loser);
  return yield Game.create(game);
};

/**
 * Get new ratings.
 */

function getNewRatings(winner, loser) {
  var expectedScoreWinner = elo.getExpected(winner, loser);
  var expectedScoreLoser = elo.getExpected(loser, winner);
  return {
    winner: elo.updateRating(expectedScoreWinner, 1, winner),
    loser: elo.updateRating(expectedScoreLoser, 0, loser)
  };
}
