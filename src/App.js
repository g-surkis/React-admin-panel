import React, { Component } from 'react';
import './App.css';
import Users from './components/Users';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Users />
      </div>
    );
  }
}

export default App;
