import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Image } from 'react-bootstrap';

import close from '../img/close.png';

export default class ModalDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.defaultValueName,
      email: this.props.defaultValueEmail
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
    if (this.props.label === 'Edit') {
      this.props.changingEfect(event.target.value, this.state.email);
    }
  }

  handleChangeEmail(event) {
    //чомусь цей метод наверх не пердається, це через event?
    //бачив документації що функції event обгортали і так передавали
    this.setState({ email: event.target.value });
    if (this.props.label === 'Edit') {
      this.props.changingEfect(this.state.name, event.target.value);
    }
  }

  handleForm(event) {
    event.preventDefault();
    let name = this.state.name;
    let email = this.state.email;
    let userData = {
      name,
      email
    };
    this.props.handleAction(userData);
  }

  render() {
    return (
      <div className="appearWindow">
        <Image
          src={close}
          thumbnail
          className="img_close_edit"
          onClick={this.props.dismiss}
        />
        <h2>{this.props.labelHeader}</h2>
        <Form className="navbar-form input-group" onSubmit={this.handleForm}>
          <label htmlFor="name">
            Name
            <input
              type="text"
              className="form"
              onChange={this.handleChangeName}
              defaultValue={this.props.defaultValueName}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form"
              onChange={this.handleChangeEmail}
              defaultValue={this.props.defaultValueEmail}
            />
          </label>
          <span />
          <button className="btn btn-primery btn-success">
            {this.props.label}
          </button>
        </Form>
      </div>
    );
  }
}
ModalDialog.propTypes = {
  changingEfect: PropTypes.func,
  defaultValueEmail: PropTypes.string,
  defaultValueName: PropTypes.string,
  dismiss: PropTypes.func,
  email: PropTypes.string,
  handleAction: PropTypes.func,
  label: PropTypes.string,
  labelHeader: PropTypes.string,
  name: PropTypes.string
};
