import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { PageHeader } from 'react-bootstrap';

import AddUser from '../components/AddUser';
import TableUsers from '../components/TableUsers';
import { loadUsers } from '../services/users';
// import { Alert, Button, Modal, Image } from "react-bootstrap";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      arr: []
    };

    this.addUser = this.addUser.bind(this);
    this.loadData = this.loadData.bind(this);
    // this.renderTableAsBackgroundToModalWindow = this.renderTableAsBackgroundToModalWindow.bind(
    //   this
    // );
    // this.renderSimpleTable = this.renderSimpleTable.bind(this);
    this.hideWindowAddUser = this.hideWindowAddUser.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.refreshTableAfterEdit = this.refreshTableAfterEdit.bind(this);
    this.refreshTableAfterDelete = this.refreshTableAfterDelete.bind(this);
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
    const rawResponse = await loadUsers();
    // const content = await  loadUsers().json(); //так не працює
    const content = await rawResponse.json(); //перенос в сервіси цього рядка теж не працює
    this.setState({ arr: content });
  }

  refreshTable(value) {
    let arr = this.state.arr;
    let newArr = [...arr, value];
    this.setState({ arr: newArr });
  }

  refreshTableAfterEdit(value) {
    let arr = this.state.arr;
    arr.forEach((item, i) => {
      if (item.id === value.id) {
        arr.splice(i, 1, value);
      }
    });
    this.setState({ arr: arr });
  }

  refreshTableAfterDelete(value) {
    let arr = this.state.arr;
    arr.forEach((item, i) => {
      if (item.id === value) {
        arr.splice(i, 1);
      }
    });
    this.setState({ arr: arr });
  }

  render() {
    let buttonAddUser;

    if (this.state.addUser == false) {
      buttonAddUser = (
        <button onClick={this.addUser} className="btn btn-success">
          Add user!
        </button>
      );
    } else {
      buttonAddUser = (
        <div>
          <AddUser
            hideWindow={this.hideWindowAddUser}
            refreshTable={this.refreshTable}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <PageHeader>
          <small>List of Users</small>
        </PageHeader>
        <div className="inputInternalIndent" />
        {buttonAddUser}
        <div className="inputInternalIndent" />
        <TableUsers
          users={this.state.arr}
          refreshTableAfterEdit={this.refreshTableAfterEdit}
          refreshTableAfterDelete={this.refreshTableAfterDelete}
          // я думав раніше що пропси доступні всім наслідникам , а виявляється іх треба передавати через
          //проміжні чілдри в параметрах
        />
      </div>
    );
  }
}
export default Users;
