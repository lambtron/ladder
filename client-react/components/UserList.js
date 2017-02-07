/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {List} from 'material-ui/List';
import UserItem from './UserItem';

export default class UserList extends React.Component {
  render() {
    var list = this.props.list;

    return (
      <List>
        {list.map(player => {
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