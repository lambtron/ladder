/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';

export default class UserList extends React.Component {
  render() {
    var list = this.props.list;

    return (
      <div>
        {list.map(player => {
          return <UserItem player={player}/>;
        })}
      </div>
    );
  }
}

UserList.propTypes = {
  list: React.PropTypes.array
};

UserList.defaultProps = {
  list: []
};