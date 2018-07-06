import React, { Component } from 'react';
import PropTypes from 'prop-types';

//import "bootstrap/dist/css/bootstrap.css";
import { Form, Image } from 'react-bootstrap';
import { addUser, loadUsers } from '../services/users';
import { showAlert } from './shared/alert';

import projectService from '../services/users2';
import close from '../img/close.png';
import ModalDialog from './ModalDialog';

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

  handleAdd(userData) {
    let idNewUser;
    projectService
      .post(userData)
      .then(res => {
        idNewUser = res.id;
        this.props.refreshTable({
          name: userData.name,
          email: userData.email,
          id: idNewUser
        });
        this.setState({ showAlert: true });
      })
      .catch(res => {
        showAlert('Somethisng was wrong', 'danger', this.dismiss);
      });
  }

  render() {
    console.log(this.state);
    if (this.state.showAlert) {
      return showAlert('User was regstered', 'info', this.dismiss);
    }
    return (
      <ModalDialog
        handleAction={this.handleAdd}
        dismiss={this.dismiss}
        onChangeName={this.handleAddName}
        onChangeEmail={this.handleAddEmail}
        defaultValueName={this.state.name}
        defaultValueEmail={this.state.email}
        label={'Add'}
        labelHeader={'Adding user'}
      />
    );
  }
}

export default AddUser;

AddUser.propTypes = {
  refreshTable: PropTypes.func,
  hideWindow: PropTypes.func
};
