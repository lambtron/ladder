/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card';

export default class GameItem extends React.Component {
  render() {
    var game = this.props.game;

    return (
      <Card>
        <CardTitle title={game.winner + ' Won'}
                   subtitle={'against ' + game.loser + ' (' + (new Date(game.createdAt)).toUTCString() + ')' }
                   actAsExpander={true}/>
        <CardText expandable={true}>
          {game.winner} : <span
          style={{"verticalAlign": "middle", "color": "green", "fontWeight": "bold"}}>+{game.winnerDiffElo}</span>
          <br/>
          {game.loser} : <span
          style={{"verticalAlign": "middle", "color": "red", "fontWeight": "bold"}}>{game.loserDiffElo}</span>
        </CardText>
      </Card>
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