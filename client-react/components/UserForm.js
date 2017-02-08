/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {newUserAction} from '../actions/userActions';
import {modalNewUserToggleAction} from '../actions/uiActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';


export class UserForm extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewUserToggle = this.handleNewUserToggle.bind(this);
  }

  handleNewUserToggle() {
    this.props.dispatch(modalNewUserToggleAction());
  }

  handleChange(event) {
    let state = {...this.state};
    if (event.target.name !== "admin") {
      state[event.target.name] = event.target.value;
    } else {
      state[event.target.name] = event.target.checked ? 1 : 0;
    }
    this.setState(state);
  };

  handleSubmit() {
    this.props.dispatch(newUserAction(this.state));
  }

  render() {
    return (
      <Dialog
        title="New Player"
        actions={
          [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleNewUserToggle}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              onTouchTap={this.handleSubmit}
            />
          ]
        }
        modal={true}
        open={this.props.open}
      >
        <form>
          <TextField
            floatingLabelText="Name"
            onChange={this.handleChange}
            name="name"
            style={{width: 45 + '%'}}
          />
          <TextField
            floatingLabelText="Rating"
            onChange={this.handleChange}
            type="number"
            defaultValue={1500}
            name="rating"
            style={{marginLeft: 10 + '%', width: 45 + '%'}}
          />
          <TextField
            floatingLabelText="Gif"
            onChange={this.handleChange}
            fullWidth={true}
            name="gif"
          />
          <Toggle
            label="Admin"
            labelPosition="right"
            defaultToggled={false}
            onToggle={this.handleChange}
            name="admin"
          />
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ui}) => ({
  open: ui.modal.new_user.open
});

export default connect(mapStateToProps)(UserForm);