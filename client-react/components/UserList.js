/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {List} from 'material-ui/List';
import UserItem from './UserItem';

export default class UserList extends React.Component {
  render() {
    const {list} = this.props;

    return (
      <List>
        {list.sort(function(a, b) {return b.rating - a.rating}).map(player => {
          return <UserItem key={player.name} player={player}/>;
        })}
      </List>
    );
  }
}

UserList.propTypes = {
  list: React.PropTypes.array
};

UserList.defaultProps = {
  list: []
};