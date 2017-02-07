/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';


export default class UserItem extends React.Component {
  render() {
    var player = this.props.player;

    var avatarStyle = {
      "marginRight": 10 + "px",
      "width": 26 + "px",
      "height": 26 + "px",
      "MozBorderRadius": 13 + "px",
      "borderRadius": 13 + "px"
    };

    return (
      <ListItem
        leftAvatar={<Avatar src={player.gif} />}
        rightIcon={<span>{player.rating}</span>}
        primaryText={player.name}
        secondaryText={player.games + ' played games'}
      />
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