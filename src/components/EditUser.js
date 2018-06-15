import React, { Component } from 'react';

import { updateUser } from '../services/users';
import { showAlert } from '../services/users';
import { Alert, Button } from 'react-bootstrap';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      email: this.props.email,
      show: true
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    // this.showAlert = this.showAlert.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleEdit(event) {
    event.preventDefault();

    let id = this.props.userId;
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    let result = updateUser(id, userData);
    console.log(result);
    result
      .then(function(res) {
        this.setState({ show: true });
        showAlert('User was updated!');
      })
      .catch(function(res) {
        showAlert('faul');
      });
  }

  render() {
    console.log(this.state);
    return (
      <div className="appearWindow">
        <h1 className="brand">Редагування даних користувача</h1>
        <form onSubmit={this.handleEdit} className="navbar-form input-group">
          <label htmlFor="name">
            Name
            <input
              type="text"
              onChange={this.handleChangeName}
              defaultValue={this.state.name}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              onChange={this.handleChangeEmail}
              defaultValue={this.state.email}
            />
          </label>
          <span />
          <button
            onClick={this.handleEdit}
            className="btn btn-primery btn-success"
          >
            Edit
          </button>
        </form>
      </div>
    );
  }
}

export default EditUser;
