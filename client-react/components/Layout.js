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
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {Link, IndexLink} from 'react-router';
import AdminAction from './AdminAction';
import Header from '../common/Header';
import LoginForm from './LoginForm';
import { drawerToggleAction } from '../actions/uiActions';
import { fetchUsersAction } from '../actions/userActions';



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
  }

  handleToggle() {
    this.props.dispatch(drawerToggleAction());
  }

  componentDidMount() {
    this.props.dispatch(fetchUsersAction());
  }

  render() {
    let buttonAdmin = null;
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
      buttonAdmin = <AdminAction/>;
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
            { buttonAdmin }
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