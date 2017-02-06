/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';
import Header from '../common/Header';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <Header/>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
          </p>
        </footer>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};