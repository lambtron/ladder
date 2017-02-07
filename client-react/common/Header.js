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
import {drawerToggleAction} from '../actions/uiActions';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.dispatch(drawerToggleAction());
  }

  render() {
    let {drawer,dispatch, ...x} = this.props;
    return (
      <AppBar
        title="Title"
        onLeftIconButtonTouchTap={this.handleToggle}
        iconElementRight={this.props.logged ? <IconMenu
            {...x}
            iconButtonElement={
              <IconButton {...x} ><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Sign out"/>
          </IconMenu> : <FlatButton {...x} label="Login"/>}
      />
    );
  }
}

const mapStateToProps = ({ users }) => ({
});

export default connect(mapStateToProps)(Header);
