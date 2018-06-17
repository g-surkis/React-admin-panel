import React, { Component } from 'react';

//import "bootstrap/dist/css/bootstrap.css";
import { Form } from 'react-bootstrap';
import { addUser, showAlert } from '../services/users';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'name',
      email: 'name@domen.com',
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

  handleAdd(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    var status = this;

    addUser(userData)
      .then(function(res) {
        status.setState({ showAlert: true });
      })
      .catch(function(res) {});
  }

  dismiss() {
    this.setState({ showAlert: false });
    this.props.hideWindow(false);
  }
  //не обновляє дані при додаванні
  render() {
    console.log(this.props.arr);
    if (this.state.showAlert) {
      return showAlert('User was regstered', 'info', this.dismiss);
    }
    return (
      <div className="appearWindow">
        <Form
          controlId="addUser"
          className="navbar-form input-group"
          onSubmit={this.handleAdd}
        >
          <label htmlFor="name">
            Name
            <input
              type="text"
              className="marginInForm"
              onChange={this.handleAddName}
              defaultValue={this.state.name}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              className="marginInForm"
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
