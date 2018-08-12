import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import { PageHeader } from 'react-bootstrap';

import AddEditUser from '../components/AddEditUser';
import TableUsers from '../components/TableUsers';
import projectService from '../services/users';

import fetchUsers from '../actions/users';
import { connect } from 'react-redux';

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
    // dispatch => {return dispatch(fetchUsers())};
  }

  componentDidUpdate(state) {
    // console.log(state.users.users.then(res=>console.log(res)));//так не дозволяє

    console.log(state.users.users); //так видає Promice.resolved із значенням
    //масив юзерів. незнаю як достати його звідти
    //також не розумію як вийшла вкладеність імен user.user

    // dispatch({type: 'FETCH_USERS', payload: this.state.arr })
    //пробував записати через локальний стейт але нема доступу до dispatch
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
    let index = arr.findIndex(item => {
      return item.id !== value.id ? false : index;
    });
    arr.splice(index, 1, value);
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
    console.log(this.props);
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
function mapStateToProps(state) {
  return { users: state.Users };
}
//для асинхронності застосовують міделвери, я не можу тут їх прилаштувати
function mapDispatchToProps(dispatch) {
  return {
    onDefaultClick: () => {
      //дана ф-я не використовується, я вчусь
      //використовувати всі можливості redux
      dispatch(fetchUsers());
    }, //колбеки мають бути спочатку?
    Users: dispatch(fetchUsers()) //тут обовязково викликати action creator? без цього
    // визову state в props не попадає
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
