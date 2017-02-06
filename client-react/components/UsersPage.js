/**
 * Created by karl on 05/02/2017.
 */
import React from 'react';
import { fetchUsersAction } from '../actions/userActions';
import UserList from './UserList';

export default class UsersPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsersAction());
  }

  render() {
    return (
      <div className="home">
        <div className="athletes-selector">
          <UserList list={this.props.users}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users
});

export default connect(mapStateToProps)(UsersPage);