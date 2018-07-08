import React, { Component } from 'react';

import { Router, Route, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Panel } from 'react-bootstrap';

import Home from '../pages/Home';
import Users from '../pages/Users';
import User from '../pages/User';

const history = createBrowserHistory();

export default class Navigation extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Panel bsStyle="primary">
            <Panel.Title>React Admin Panel</Panel.Title>
          </Panel>
          <ul>
            <li>
              <NavLink to="/" activeclassname="selected">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users" activeclassname="selected">
                Users
              </NavLink>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/user/:userId" component={User} />
        </div>
      </Router>
    );
  }
}
