import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {
  BrowserRouter,
  Router,
  Route,
  hashHistory,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Navigation from './components/Navigation';

const history = createBrowserHistory();

ReactDOM.render(<Navigation />, document.getElementById('root'));
registerServiceWorker();
