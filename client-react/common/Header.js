/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {drawerToggleAction, modalLoginToggleAction} from '../actions/uiActions';
import {logoutAction} from '../actions/profileActions';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleModalLoginToggle = this.handleModalLoginToggle.bind(this);
  }

  handleToggle() {
    this.props.dispatch(drawerToggleAction());
  }

  handleModalLoginToggle() {
    this.props.dispatch(modalLoginToggleAction());
  }

  handleLogout() {
    this.props.dispatch(logoutAction());
  }

  render() {
    let {drawer,dispatch, logged, ...x} = this.props;
    return (
      <AppBar
        title="Ladder"
        onLeftIconButtonTouchTap={this.handleToggle}
        onRightIconButtonTouchTap={this.handleModalLoginToggle}
        iconElementRight={logged ? <IconMenu
            {...x}
            iconButtonElement={
              <IconButton {...x} ><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem onTouchTap={this.handleLogout} primaryText="Sign out"/>
          </IconMenu> : <FlatButton {...x} label="Login"/>}
      />
    );
  }
}

const mapStateToProps = ({ profile }) => ({
  logged: profile ? profile.logged : false
});

export default connect(mapStateToProps)(Header);
