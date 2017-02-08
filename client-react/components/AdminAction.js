/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {modalNewUserToggleAction, modalNewGameToggleAction, adminActionsToggleAction} from '../actions/uiActions';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ActionEvent from 'material-ui/svg-icons/action/event';
import UserForm from './UserForm';
import GameForm from './GameForm';


export class AdminAction extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleNewUserToggle = this.handleNewUserToggle.bind(this);
    this.handleNewGameToggle = this.handleNewGameToggle.bind(this);
    this.handleAdminActionToggle = this.handleAdminActionToggle.bind(this);
  }

  handleNewUserToggle() {
    this.props.dispatch(modalNewUserToggleAction());
  }

  handleNewGameToggle() {
    this.props.dispatch(modalNewGameToggleAction());
  }

  handleAdminActionToggle() {
    this.props.dispatch(adminActionsToggleAction());
  }

  render() {
    let buttons = null;
    let modals = null;
    if (this.props.open) {
      let buttonsStyle = {
        marginBottom: 24
      };
      buttons = [
        <div key="player"><FloatingActionButton style={buttonsStyle} onTouchTap={this.handleNewUserToggle}><SocialPerson/></FloatingActionButton></div>,
        <div key="game"><FloatingActionButton style={buttonsStyle} onTouchTap={this.handleNewGameToggle}><ActionEvent/></FloatingActionButton></div>
      ];
      modals = [
        <UserForm key="new-user"/>,
        <GameForm key="new-game"/>
      ]
    }
    return (
      <div style={{position: 'fixed', bottom: 0, right: 0, marginBottom: 24, marginRight: 24}}>
        {buttons}
        <div>
          <FloatingActionButton onTouchTap={this.handleAdminActionToggle}>
            <ContentAdd/>
          </FloatingActionButton>
        </div>
        {modals}
      </div>
    );
  }
}

const mapStateToProps = ({ui}) => ({
  open: ui.admin_actions.open
});

export default connect(mapStateToProps)(AdminAction);