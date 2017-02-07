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
    return (
      <div className="row">
        <div className="col-xs-12">
          <UserList list={this.props.users}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users[0]
});

export default connect(mapStateToProps)(UsersPage);