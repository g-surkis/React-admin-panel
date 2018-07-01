import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import "bootstrap/dist/css/bootstrap.css";
import { Form } from 'react-bootstrap';
import { addUser } from '../services/users';
import { showAlert } from './shared/alert';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      showAlert: false
    };

    this.handleAdd = this.handleAdd.bind(this);
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

  handleAdd(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    let idNewUser;

    addUser(userData) //переміщення не працює
      .then(res => {
        idNewUser = res.id;
        this.props.refreshTable({ name: name, email: email, id: idNewUser });
        this.setState({ showAlert: true });
      })
      .catch(res => {
        showAlert('Somethisng was wrong', 'danger', this.dismiss);
      });
  }

  render() {
    if (this.state.showAlert) {
      return showAlert('User was regstered', 'info', this.dismiss);
    }
    return (
      <div className="appearWindow">
        <h2>Adding user</h2>
        <Form className="navbar-form input-group" onSubmit={this.handleAdd}>
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
          <button className="btn btn-primery btn-success">ADD</button>
        </Form>
      </div>
    );
  }
}

export default AddUser;

AddUser.propTypes = {
  refreshTable: PropTypes.func,
  hideWindow: PropTypes.func
};
