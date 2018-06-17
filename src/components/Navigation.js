// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter,
  Router,
  Route,
  hashHistory,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Users from './Users';
import EditUser from './EditUser';
import ViewInfoUser from './ViewInfoUser';

const history = createBrowserHistory();

export default class Navigation extends Component {
  //навіть не уявляю для чого тут роутер
  render() {
    return (
      <BrowserRouter history={history}>
        <div>
          {/* <li><Link to="/">Home</Link></li>
            <li><Link to="/about"></Link></li>
            <li><Link to="/Info"></Link></li>
             */}

          <Route path="/" component={Users} />
          <Route path="/edit" component={EditUser} />
          {/* <Route path="/showUser/{}" component={ViewInfoUser}/> // тут можна id додати в адресу?  */}

          {/* <Route path="/" component={}/>
            <Route path="/" component={}/> */}
        </div>
      </BrowserRouter>
    );
  }
}
