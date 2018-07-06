import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { updateUser } from '../services/users';
import { Form, Image } from 'react-bootstrap';

import { showAlert } from './shared/alert';
import close from '../img/close.png';
import ModalDialog from './ModalDialog';

import projectService from '../services/users2';

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
    // this.handleChangeName = this.handleChangeName.bind(this);
    // this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.dismiss = this.dismiss.bind(this);
  }

  // handleChangeName(event) {
  //   this.setState({ name: event.target.value });
  //   this.props.changingEfect(event.target.value , this.state.email)
  // }

  // handleChangeEmail(event) {
  //   this.setState({ email: event.target.value });
  //   this.props.changingEfect(this.state.name, event.target.value)
  // }

  dismiss() {
    this.props.hideEditWindow(false);
  }

  handleEdit(userData) {
    // event.preventDefault();

    let id = +this.props.userId;
    let name = userData.name;
    let email = userData.email;
    // let userData = {
    //   name,
    //   email
    // };

    projectService
      .patch(id, userData)
      .then(res => {
        this.setState({ showAlert: true, success: true });
        // this.props.refreshTableAfterEdit({ id, userData.name, userData.email }); чомуцей синтаксис з помилками, я так робив
        //раніше. підсвічує мені точку між userData and name
        this.props.refreshTableAfterEdit({ id, name, email });
      })
      .catch(res => {
        this.setState({ showAlert: true, success: false });
      });
  }

  render() {
    if (this.state.showAlert === true && this.state.success === true) {
      return showAlert(
        'Congratulations! You jast have corrected user data!.',
        'info',
        this.dismiss
      );
    }
    if (this.state.showAlert === true && this.state.success === false) {
      return showAlert(
        'Error. Please try again',
        'warning',
        this.handleDismiss
      );
    }
    if (this.state.showAlert === false) {
      return (
        <ModalDialog
          handleAction={this.handleEdit}
          dismiss={this.dismiss}
          name={this.props.name}
          email={this.props.email}
          defaultValueName={this.state.name}
          defaultValueEmail={this.state.email}
          label={'Add'}
          labelHeader={'Adding user'}
          changingEfect={this.props.changingEfect}
        />
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
