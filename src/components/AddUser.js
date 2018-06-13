import React, { Component } from 'react';

//import "bootstrap/dist/css/bootstrap.css";
import { Form, Button } from 'react-bootstrap';
import { addFetch } from '../services/users';

//не розумію чому перезагружається сторінка після надсилання даних
//це стандартна поведінка браузера??? ДОМ при цьому ж не міняється
//@ для форми стандратна поведінка, коли сабмітись форму, тому потрібно обробляти подію onSubmit і для події робити
//@ e.preventDefault();

class AddUser extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleAdd() {
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var obj = {
      name: name.value,
      email: email.value
    };

    addFetch(obj);
  }

  render() {
    // console.log(document.form.addUser);
    return (
      <div className="appearWindow">
        //тут має бути ще хрестик відміни спливаючого вікна. пізніше дороблю
        <Form controlId="addUser" className="navbar-form input-group">
          <label htmlFor="name">
            Name
            <input type="text" id="name" className="marginInForm" />
          </label>

          <label htmlFor="email">
            Email
            <input type="email" id="email" className="marginInForm" />
          </label>
          <span />
          <button
            type="submit"
            onClick={this.handleAdd.bind(this)}
            className="btn btn-primery btn-success"
          >
            ADD
          </button>
        </Form>
      </div>
    );
  }
}

export default AddUser;
