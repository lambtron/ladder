/**
 * Created by karl on 05/02/2017.
 */
'use strict';

import React from 'react';

export default class GameForm extends React.Component {
  render() {
    return (
      <div style={{textAlign: "center"}} className="row">
        <form className="form-inline">
          <div className="form-group">
            <label className="sr-only" htmlFor="name">Username</label>
            <input type="text" className="form-control" id="name" placeholder="Name"/>
          </div>
        </form>
      </div>
    );
  }
}