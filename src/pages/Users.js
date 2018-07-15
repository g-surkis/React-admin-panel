import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { PageHeader } from 'react-bootstrap';

import AddEditUser from '../components/AddEditUser';
import TableUsers from '../components/TableUsers';
import projectService from '../services/users';

class Users extends Component {
  constructor(props) {
    super(props);

    // this.content = await projectService.get();

    this.state = {
      addUser: false,
      //також я бачив такі визови в прикладах але щось не так тут, але мабуть через асинхронність не працює
      //  arr:   projectService.get()

      arr: [] //якось треба оголосити state типом array, бо судячи з всього проміс повертає тип object  і state.arr стає
      //object, і відповідно arr.map не може його опрацювати
    };

    this.addUser = this.addUser.bind(this);
    this.hideWindowAddUser = this.hideWindowAddUser.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.refreshTableAfterEdit = this.refreshTableAfterEdit.bind(this);
    this.refreshTableAfterDelete = this.refreshTableAfterDelete.bind(this);
  }

  componentDidMount() {
    (async () => {
      //працює
      const content = await projectService.get();
      this.setState({ arr: content });

      // а так хотів скоротити - не працює
      // await this.setState({ arr: projectService.get()});
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
      item.id !== value.id ? false : arr.splice(i, 1, value);
    });
    this.setState({ arr: arr });
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
        <div className="inputInternalIndent" />
        {buttonAddUser}
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
