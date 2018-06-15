import React, { Component } from 'react';

//import "bootstrap/dist/css/bootstrap.css";
import { Form } from 'react-bootstrap';
import { addUser } from '../services/users';

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'name',
      email: 'email@domen.com'
    };

    this.handleAdd = this.handleAdd.bind(this);

    this.handleAddName = this.handleAddName.bind(this);
    this.handleAddEmail = this.handleAddEmail.bind(this);
  }

  handleAddName(event) {
    this.setState({ name: event.target.value });
  }

  handleAddEmail(event) {
    this.setState({ email: event.target.value });
    console.log(event.target.value);
  }

  handleAdd(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };

    addUser(userData);
  }
  //також після добавлення нового користувача, він не появляється в таблиці без перезагрузки іне зникає
  //діалогове вікно. підкажи що тут зробити

  render() {
    return (
      <div className="appearWindow">
        <p>
          тут має бути ще хрестик відміни спливаючого вікна. пізніше дороблю
        </p>
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
