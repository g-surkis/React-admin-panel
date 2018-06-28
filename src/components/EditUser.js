import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateUser } from '../services/users';
import { Alert, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { showAlert } from './shared/alert';

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      email: this.props.email,
      showAlert: false,
      success: true
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.successEdit = this.successEdit.bind(this);
    this.fallEdit = this.fallEdit.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleDismiss() {
    this.setState({ showAlert: false });
    this.props.hideEditWindow(false);
  }

  successEdit() {
    return (
      <Alert bsStyle="success" className="">
        <strong>Congratulations!</strong> You jast have corrected user data!.
        <span> </span>
        <Button onClick={this.handleDismiss}>Hide Alert</Button>
      </Alert>
    );
  }

  fallEdit() {
    return (
      <Alert bsStyle="danger">
        <strong>Oops!</strong> Something gets wrong(. Try again.
        <span> </span>
        <Button onClick={this.handleDismiss}>Hide Alert</Button>
      </Alert>
    );
  }

  handleEdit(event) {
    event.preventDefault();

    let id = +this.props.userId;
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    updateUser(id, userData)
      .then(res => {
        this.setState({ showAlert: true });
        this.props.refreshTableAfterEdit({ id, name, email });
      })
      .catch(res => {});
  }

  render() {
    if (this.state.showAlert === true) {
      //підкажи як вивести цей алерт поза табличкою. бо мучився і не міг. Модал зробив
      //але все ж таки про алерт цікаво
      return showAlert(
        'Congratulations! You jast have corrected user data!.',
        'info',
        this.handleDismiss
      );
    }
    if (this.state.showAlert === false) {
      return (
        <div className="appearWindow">
          <h1 className="brand">Editing user data</h1>
          <Form className="navbar-form input-group" onSubmit={this.handleEdit}>
            <label htmlFor="name">
              Name
              <input
                type="text"
                className="form"
                onChange={this.handleChangeName}
                defaultValue={this.state.name}
              />
            </label>

            <label htmlFor="email">
              Email
              <input
                type="email"
                className="form"
                onChange={this.handleChangeEmail}
                defaultValue={this.state.email}
              />
            </label>
            <span />
            <button className="btn btn-primery btn-success">Edit</button>
          </Form>
        </div>
      );
    }
  }
}

export default EditUser;

EditUser.propTypes = {
  userId: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string
};
