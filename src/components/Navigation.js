import React, { Component } from 'react';

import { Router, Route, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Panel } from 'react-bootstrap';

import Home from '../pages/Home';
import Users from '../pages/Users';
import User from '../pages/User';
import Footer from './Footer';

const history = createBrowserHistory();

export default class Navigation extends Component {
  render() {
    return (
      <React.StrictMode>
        <Router history={history}>
          <div>
            <div className="top_panel">
              <Panel bsStyle="primary">
                <Panel.Title>
                  <h3 className="app_header">React Admin Panel</h3>
                </Panel.Title>
              </Panel>
            </div>
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

            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route path="/user/:userId" component={User} />
          </div>
        </Router>
        <hr />
        <Footer />
      </React.StrictMode>
    );
  }
}
