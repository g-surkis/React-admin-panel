import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import AddUser from './AddUser';
import TableUsers from './TableUsers';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      arr: []
    };

    this.addUser = this.addUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.renderTableWithWindow = this.renderTableWithWindow.bind(this);
    this.renderSimpleTable = this.renderSimpleTable.bind(this);
    this.hideWindowAddUser = this.hideWindowAddUser.bind(this);
  }

  addUser(value) {
    this.setState({ addUser: true });
  }

  hideWindowAddUser(value) {
    this.setState({ addUser: value });
  }

  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const rawResponse = await fetch('http://localhost:3001/users');
    const content = await rawResponse.json();
    this.setState({ arr: content });
  }

  renderSimpleTable() {
    return (
      <div className="container">
        <div className="emptySpace" />
        <button onClick={this.addUser} className="btn btn-success">
          Add user!
        </button>
        <div className="emptySpace" />
        <TableUsers arr={this.state.arr} />
      </div>
    );
  }
  renderTableWithWindow() {
    return (
      <div>
        <div>
          <AddUser hideWindow={this.hideWindowAddUser} />
        </div>

        <div className="container">
          <TableUsers arr={this.state.arr} />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.addUser) {
      return this.renderTableWithWindow();
    } else {
      return this.renderSimpleTable();
    }
  }
}

export default Users;
