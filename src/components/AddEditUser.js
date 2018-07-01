import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';
import { showAlert } from './shared/alert';

class AddEditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      showAlert: false
    };

    this.handleForm = this.handleForm.bind(this);
    this.handleAddName = this.handleAddName.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  handleAddName(event) {
    this.setState({ name: event.target.value });
  }

  handleAddEmail(event) {
    this.setState({ email: event.target.value });
  }

  dismiss() {
    this.setState({ showAlert: false });
    this.props.hideWindow(false);
  }

  handleForm(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    this.props.method(userData, this.props.userId);
  }

  //класний метод)
  static getDerivedStateFromProps(nextProps, prevState) {
    return { name: nextProps.name, email: nextProps.email };
  }

  render() {
    if (this.state.showAlert) {
      return showAlert(
        this.props.textAlert,
        this.props.styleAlert,
        this.dismiss
      );
    }
    return (
      <div className="appearWindow">
        <h2>{this.props.textWindow}</h2>
        <Form className="navbar-form input-group" onSubmit={this.handleForm}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              className="form"
              onChange={this.handleAddName}
              defaultValue={this.state.name}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form"
              onChange={this.handleAddEmail}
              defaultValue={this.state.email}
            />
          </label>
          <span />
          <button className="btn btn-primery btn-success">
            {this.props.action}
          </button>
        </Form>
      </div>
    );
  }
}

export default AddEditUser;

AddEditUser.propTypes = {
  refreshTable: PropTypes.func,
  hideWindow: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  userId: PropTypes.number,
  hideEditWindow: PropTypes.func,
  method: PropTypes.func,
  textAlert: PropTypes.string,
  styleAlert: PropTypes.string,
  textWindow: PropTypes.string,
  action: PropTypes.string
};
