import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import AddUser from './AddUser';
import TableUsers from './TableUsers';
import { loadData } from '../services/users';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      arr: []
    };

    this.addUser = this.addUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.renderTableAsBackgroundToModalWindow = this.renderTableAsBackgroundToModalWindow.bind(
      this
    );
    this.renderSimpleTable = this.renderSimpleTable.bind(this);
    this.hideWindowAddUser = this.hideWindowAddUser.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
  }

  addUser(value) {
    this.setState({ addUser: true });
  }

  hideWindowAddUser(value) {
    this.setState({ addUser: value });
  }

  componentDidMount() {
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
        <div className="inputInternalIndent" />
        <button onClick={this.addUser} className="btn btn-success">
          Add user!
        </button>
        <div className="inputInternalIndent" />
        <TableUsers arr={this.state.arr} />
      </div>
    );
  }
  renderTableAsBackgroundToModalWindow() {
    //незнаю як скоротити
    return (
      <div>
        <div>
          <AddUser
            hideWindow={this.hideWindowAddUser}
            refreshTable={this.refreshTable}
          />
        </div>

        <div className="container">
          <TableUsers arr={this.state.arr} />
        </div>
      </div>
    );
  }

  refreshTable(value) {
    let arr = this.state.arr;
    let newArr = [...arr, value];
    this.setState({ arr: newArr });
  }

  render() {
    if (this.state.addUser) {
      return this.renderTableAsBackgroundToModalWindow();
    } else {
      return this.renderSimpleTable();
    }
  }
}
export default Users;
