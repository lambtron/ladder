/**
 * Created by karl on 05/02/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { fetchUsersAction } from '../actions/userActions';
import UserList from './UserList';

class UsersPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchUsersAction());
  }

  render() {
    const {users} = this.props;

    return (
      <div className="row">
        <div className="col-xs-12">
          <UserList list={users}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users
});

export default connect(mapStateToProps)(UsersPage);