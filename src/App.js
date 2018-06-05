import React, {Component} from 'react';
import './App.css';
import Users from './components/Users';
//import AddUser from './components/AddUser';

import "bootstrap/dist/css/bootstrap.css";
// import {Grid, Button, Navbar} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Users/>
      </div>
    );
  }
}

export default App;
