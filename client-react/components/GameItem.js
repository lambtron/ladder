/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';

export default class GameItem extends React.Component {
  render() {
    var game = this.props.game;

    return (
      <div style={{textAlign: "center"}} className="row">
        <span style={{"verticalAlign": "middle", "color": "green", "fontWeight": "bold"}}
              className="col-xs-2 col-xs-offset-2">
          {game.winner}<br/>
          {game.winnerDiffElo}
        </span>
        <span className="col-xs-3">
          Vs
        </span>
        <span style={{"verticalAlign": "middle", color: "red"}}
              className="col-xs-2">
          {game.loser}<br/>
          {game.loserDiffElo}
        </span>
      </div>
    );
  }
}

GameItem.propTypes = {
  game: React.PropTypes.shape({
    createdAt: React.PropTypes.number.isRequired,
    winner: React.PropTypes.string.isRequired,
    loser: React.PropTypes.string.isRequired,
    winnerNewElo: React.PropTypes.number.isRequired,
    winnerOldElo: React.PropTypes.number.isRequired,
    winnerDiffElo: React.PropTypes.number.isRequired,
    loserNewElo: React.PropTypes.number.isRequired,
    loserOldElo: React.PropTypes.number.isRequired,
    loserDiffElo: React.PropTypes.number.isRequired
  }).isRequired
};