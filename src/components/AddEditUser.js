import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateUser, addUser } from '../services/users';
import { Alert, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { showAlert } from './shared/users';

class AddEditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      email: this.props.email,
      showAlert: false
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.dismiss = this.dismiss.bind(this);

    this.handleForm = this.handleForm.bind(this);
  }

  handleForm(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    let userId = this.props.userId;
    if (this.props.kindOfAction == 'edit') {
      updateUser(userId, userData)
        .then(res => {
          this.setState({ showAlert: true });
        })
        .catch(res => {
          this.setState({ showAlert: true, success: false });
        });
    }
    if (this.props.kindOfAction == 'add') {
      addUser(userData)
        .then(res => {
          res.json().then(res => {
            userId = res.id;
            this.props.refreshTable({
              name: name,
              email: email,
              id: userId
            });
          });
          this.setState({ showAlert: true });
        })
        .catch(res => {
          showAlert('Somethisng was wrong', 'danger', this.dismiss);
        });
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  dismiss() {
    this.setState({ showAlert: false });
    this.props.hideWindow(false);
  }

  render() {
    if (this.props.kindOfAction == 'edit') {
      if (this.state.showAlert) {
        return showAlert(
          'Data was changed succefully',
          'success',
          this.dismiss
        );
      }
      return (
        <div className="appearWindow">
          <h1 className="brand">Редагування даних користувача</h1>
          <Form className="navbar-form input-group" onSubmit={this.handleForm}>
            <label htmlFor="name">
              Name
              <input
                type="text"
                className="form"
                onChange={this.handleChangeName}
                defaultValue={this.props.name}
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                type="email"
                className="form"
                onChange={this.handleChangeEmail}
                defaultValue={this.props.email}
              />
            </label>
            <span />
            <button className="btn btn-primery btn-success">Edit</button>
          </Form>
        </div>
      );
    } else if (this.props.kindOfAction == 'add') {
      if (this.state.showAlert) {
        return showAlert('You added user succefully', 'success', this.dismiss);
      }
      return (
        <div className="appearWindow">
          <h1 className="brand">Додавання нового користувача</h1>
          <Form className="navbar-form input-group" onSubmit={this.handleForm}>
            <label htmlFor="name">
              Name
              <input
                type="text"
                className="form"
                onChange={this.handleChangeName}
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                type="email"
                className="form"
                onChange={this.handleChangeEmail}
              />
            </label>
            <span />
            <button className="btn btn-primery btn-success">Add</button>
          </Form>
        </div>
      );
    }
  }
}

export default AddEditUser;
