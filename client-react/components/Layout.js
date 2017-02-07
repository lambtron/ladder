/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {Link, IndexLink} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Header from '../common/Header';
import LoginForm from './LoginForm';
import {drawerToggleAction, modalNewGameToggleAction} from '../actions/uiActions';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export class Layout extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNewUserToggle = this.handleNewUserToggle.bind(this);
  }

  handleToggle() {
    this.props.dispatch(drawerToggleAction());
  }

  handleNewUserToggle() {
    this.props.dispatch(modalNewGameToggleAction());
  }

  render() {
    let buttonAdd = null;
    let {drawer, dispatch, profile, ...x} = this.props;
    let style = {
      container: {
        minHeight: 400, paddingLeft: this.props.drawer.open ? 256 : 0
      },
      containerBody: {
        margin: "48 72"
      }
    };

    if (profile.admin && profile.logged) {
      buttonAdd = <IconMenu
        iconButtonElement={<FloatingActionButton><ContentAdd /></FloatingActionButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
        style={{float: "right", marginRight: 24}}
      >
        <MenuItem onTouchTap={this.handleNewUserToggle} primaryText="Add a game"/>
        <MenuItem primaryText="Add a user"/>
      </IconMenu>;
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app-container">
          <Drawer
            docked={false}
            width={200}
            open={this.props.drawer.open}
            onRequestChange={this.handleToggle}
          >
            <AppBar title="Ladder" onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            />
            <MenuItem><IndexLink to="/" activeClassName="active">Ranking</IndexLink></MenuItem>
            <MenuItem><Link to="/game" activeClassName="active">Games</Link></MenuItem>
          </Drawer>
          <header>
            <Header drawer={this.props.drawer}/>
          </header>
          <div className="app-content" style={style.container}>
            <div style={style.containerBody}>{this.props.children}</div>
            { buttonAdd }
          </div>
          <footer>
          </footer>
          <LoginForm/>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout.propTypes = {
  drawer: React.PropTypes.shape({
    open: React.PropTypes.bool
  }),
  profile: React.PropTypes.shape({
    admin: React.PropTypes.bool,
    logged: React.PropTypes.bool
  }),
  children: React.PropTypes.object.isRequired
};

Layout.defaultProps = {
  drawer: {
    open: false
  },
  profile: {
    logged: false,
    admin: false
  }
};

const mapStateToProps = ({ui, profile}) => ({
  drawer: ui.drawer,
  profile: profile
});

export default connect(mapStateToProps)(Layout);