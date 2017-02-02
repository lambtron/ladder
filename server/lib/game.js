/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
var User = require('./user.js');
var Game = wrap(db.get('game'));

/**
 * Expose `Game`.
 */

module.exports = Game;

/**
 * Upsert Game.
 */

Game.create = function *(game) {
  return yield this.insert(newGame(game));
};

/**
 * Delete Game.
 */

Game.delete = function *(id) {
  var
    game = yield this.findById(id);

  if (!game) return URIError('cannot find that game', 404);

  var lastWinnerGame = yield this.findOne({winner: game.winner}, {sort: {'createdAt': -1}});

  if(lastWinnerGame._id == id) {
    yield User.update({name: lastWinnerGame.winner}, {'$set': {rating: game.winnerOldElo}, '$inc': {games: -1}});
    yield User.update({name: lastWinnerGame.loser}, {'$set': {rating: game.loserOldElo}, '$inc': {games: -1}});

    return yield this.remove({_id: id});
  } else {
    return new TypeError('that game must be the last game for both winner and looser', 400);
  }
};

/**
 * Return new game object.
 */

function newGame(game) {
  return {
    winner: game.winner.name,
    loser: game.loser.name,
    winnerOldElo: game.winner.old,
    winnerNewElo: game.winner.new,
    loserOldElo: game.loser.old,
    loserNewElo: game.loser.new,
    createdAt: Date.now()
  };
}
