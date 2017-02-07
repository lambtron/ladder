/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import GameItem from './GameItem';

export default class GameList extends React.Component {
  render() {
    var list = this.props.list;

    return (
      <div>
        {list.map(game => {
          return <GameItem key={game.createdAt} game={game}/>;
        })}
      </div>
    );
  }
}

GameList.propTypes = {
  list: React.PropTypes.array
};

GameList.defaultProps = {
  list: []
};