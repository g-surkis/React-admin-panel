import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Router,
  Route,
  hashHistory,
  NavLink
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './Home';
import Users from './Users';
import EditUser from './EditUser';
import ViewInfoUser from './ViewInfoUser';

const history = createBrowserHistory();

export default class Navigation extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
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
          {/*цей NavLink не враховує мабуть exact  */}
          <Route path="/users/:userId" component={ViewInfoUser} />
        </div>
      </Router>
    );
  }
}
