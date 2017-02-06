/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (<div className="text-center">
        <nav className="navbar navbar-default">
          <IndexLink to="/" activeClassName="active">Rating</IndexLink>
          {" | "}
          <Link to="game" activeClassName="active">Games</Link>
        </nav>
      </div>
    );
  }
}
