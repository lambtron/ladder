/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {newGameAction} from '../actions/gameActions';
import {modalNewGameToggleAction} from '../actions/uiActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export class GameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {winner: null, loser: null};

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeWinner = this.handleChangeWinner.bind(this);
    this.handleChangeLoser = this.handleChangeLoser.bind(this);
    this.handleNewGameToggle = this.handleNewGameToggle.bind(this);
  }

  handleNewGameToggle() {
    this.props.dispatch(modalNewGameToggleAction());
  }

  handleChangeWinner(event, index, value) {
    let state = {...this.state};
    state.winner = value;
    this.setState(state);
  };

  handleChangeLoser(event, index, value) {
    let state = {...this.state};
    state.loser = value;
    this.setState(state);
  };

  handleSubmit() {
    this.props.dispatch(newGameAction(this.state));
  }

  render() {
    let items = this.props.users.map(user => {
      return <MenuItem key={user.name} value={user.name} primaryText={user.name}/>;
    });

    return (
      <Dialog
        title="New Game"
        actions={
          [
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={this.handleNewGameToggle}
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
        <SelectField
          value={this.state.winner}
          onChange={this.handleChangeWinner}
          floatingLabelText="Winner"
          name="winner"
        >
          {items}
        </SelectField>
        <SelectField
          value={this.state.loser}
          onChange={this.handleChangeLoser}
          floatingLabelText="Loser"
          name="loser"
        >
          {items}
        </SelectField>
      </Dialog>
    );
  }
}

const mapStateToProps = ({ui, users}) => ({
  open: ui.modal.new_game.open,
  users: users
});

export default connect(mapStateToProps)(GameForm);