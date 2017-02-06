/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';

export default class UserItem extends React.Component {
  render() {
    var player = this.props.player;

    var avatarStyle = {
      "margin-right": 10 + "px",
      "width": 26 + "px",
      "height": 26 + "px",
      "-moz-border-radius": 13 + "px",
      "border-radius": 13 + "px"
    };

    return (
      <div style='margin: 10px 0px 10px 0px'>
        <span>
          <img src={player.gif} style={avatarStyle}/>
        </span>
        <span style='vertical-align: middle'>
          {player.name}
        </span>
        <span className='pull-right'>
          {player.rating}
        </span>
      </div>
    );
  }
}

UserItem.propTypes = {
  player: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    gif: React.PropTypes.string,
    rating: React.PropTypes.number.isRequired
  }).isRequired
};

UserItem.defaultProps = {
  player: {
    gif: 'http://media.giphy.com/media/wvU4jl82C9cis/giphy.gif'
  }
};