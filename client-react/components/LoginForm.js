/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {connectAction} from '../actions/profileActions';
import {modalLoginToggleAction} from '../actions/uiActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';


export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginToggle = this.handleLoginToggle.bind(this);
  }

  handleLoginToggle() {
    this.props.dispatch(modalLoginToggleAction());
  }

  handleChange(event) {
    let state = {...this.state};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  handleLogin() {
    this.props.dispatch(connectAction({'username': this.state.username, 'password': this.state.password}));
  }

  render() {
    return (
      <Dialog
        title="Log in"
        actions={
          [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleLoginToggle}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onTouchTap={this.handleLogin}
            />
          ]
        }
        modal={true}
        open={this.props.open}
      >
        <form>
          <TextField
            floatingLabelText="name"
            onChange={this.handleChange}
            fullWidth={true}
            name="username"
          />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.handleChange}
            fullWidth={true}
            name="password"
          />
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ui}) => ({
  open: ui.modal.login.open
});

export default connect(mapStateToProps)(LoginForm);