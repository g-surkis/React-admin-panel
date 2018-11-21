import React, { Component } from 'react';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import { PageHeader } from 'react-bootstrap';

import AddEditUser from '../components/AddEditUser';
import TableUsers from '../components/TableUsers';
import projectService from '../services/users';

0;

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUser: false,
      arr: []
    };

    this.addUser = this.addUser.bind(this);
    this.hideWindowAddUser = this.hideWindowAddUser.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.refreshTableAfterEdit = this.refreshTableAfterEdit.bind(this);
    this.refreshTableAfterDelete = this.refreshTableAfterDelete.bind(this);
  }

  componentDidMount() {
    (async () => {
      const content = await projectService.get();
      this.setState({ arr: content });
    })();
  }

  addUser(value) {
    this.setState({ addUser: true });
  }

  hideWindowAddUser(value) {
    this.setState({ addUser: value });
  }

  refreshTable(value) {
    let arr = this.state.arr;
    let newArr = [...arr, value];
    this.setState({ arr: newArr });
  }

  refreshTableAfterEdit(value) {
    let arr = this.state.arr.slice();
    arr.find((item, i) => {
      return item.id !== value.id ? false : arr.splice(i, 1, value);
    });
    this.setState({ arr: arr });
    return;
  }

  refreshTableAfterDelete(value) {
    let arr = this.state.arr.slice();
    let num = arr.indexOf(value);
    arr.splice(num, 1);
    this.setState({ arr: arr });
  }

  render() {
    let buttonAddUser;

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
            label={'Add'}
            labelHeader={'Adding user'}
            hideDialogWindow={this.hideWindowAddUser}
            refreshTable={this.refreshTable}
            textAlert={'User was registered'}
            styleAlert={'info'}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <PageHeader>
          <small>List of Users</small>
          <div id="alert" />
        </PageHeader>
        <div className="input_internal_indent" />
        {buttonAddUser}
        <div className="input_internal_indent" />
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
