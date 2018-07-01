import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { PageHeader } from 'react-bootstrap';

import AddEditUser from '../components/AddEditUser';
import TableUsers from '../components/TableUsers';
import { loadUsers } from '../services/users';

import { showAlert } from '../components/shared/alert';
import { addUser } from '../services/users';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      arr: [],
      showAlert: false,
      successAddUser: false
    };

    this.addUser = this.addUser.bind(this);
    this.addUserFunc = this.addUserFunc.bind(this);

    this.loadData = this.loadData.bind(this);
    this.dismiss = this.dismiss.bind(this);

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
    const content = await loadUsers(); //так не працює
    this.setState({ arr: content });
  }

  addUserFunc(userData) {
    let idNewUser;
    addUser(userData)
      .then(res => {
        idNewUser = res.id;
        this.refreshTable({
          name: userData.name,
          email: userData.email,
          id: +idNewUser
        });
        this.setState({ showAlert: true, successAddUser: true });
        this.hideWindowAddUser(false);
      })
      .catch(res => {
        this.setState({ showAlert: true, successAddUser: false });
      });
  }

  dismiss() {
    this.setState({ showAlert: false });
  }

  refreshTable(value) {
    let arr = this.state.arr;
    let newArr = [...arr, value];
    this.setState({ arr: newArr });
  }

  refreshTableAfterEdit(value) {
    let newArr = this.state.arr;
    newArr.forEach((item, i) => {
      if (item.id === value.id) {
        newArr.splice(i, 1, value);
      }
    });
    this.setState({ arr: newArr });
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
    let buttonAddUser, alert;

    if (this.state.addUser === false) {
      buttonAddUser = (
        <button onClick={this.addUser} className="btn btn-success">
          Add user!
        </button>
      );
    } else {
      buttonAddUser = (
        <div>
          <AddEditUser
            method={this.addUserFunc}
            hideWindow={this.hideWindowAddUser}
            textWindow={'Adding user'}
            action={'Add'}
          />
        </div>
      );
    }

    if (this.state.showAlert === true && this.state.successAddUser === true) {
      alert = showAlert('User was registered', 'info', this.dismiss);
    }
    if (this.state.showAlert === true && this.state.successAddUser === false) {
      alert = showAlert(
        'User was not registered. Try again',
        'warning',
        this.dismiss
      );
    }
    return (
      <div className="container">
        <PageHeader>
          <small>List of Users</small>
        </PageHeader>
        <div className="inputInternalIndent" />
        {buttonAddUser}
        {alert}
        <div className="inputInternalIndent" />
        <TableUsers
          users={this.state.arr}
          refreshTableAfterEdit={this.refreshTableAfterEdit}
          refreshTableAfterDelete={this.refreshTableAfterDelete}
        />
      </div>
    );
  }
}
export default Users;
