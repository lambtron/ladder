
/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');
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
