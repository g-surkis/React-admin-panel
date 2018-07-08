import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { showAlert } from './shared/alert';
import ModalDialog from './ModalDialog';

import projectService from '../services/users';

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
    this.dismiss = this.dismiss.bind(this);
  }

  dismiss() {
    this.props.hideEditWindow(false);
  }

  handleEdit(userData) {
    let id = +this.props.userId;

    projectService
      .patch(id, userData)
      .then(res => {
        this.setState({ showAlert: true, success: true });
        this.props.refreshTableAfterEdit({
          id: +this.props.userId,
          name: userData.name,
          email: userData.email
        });
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
      return showAlert('Error. Please try again', 'warning', this.dismiss);
    }
    if (this.state.showAlert === false) {
      return (
        <ModalDialog
          handleAction={this.handleEdit}
          dismiss={this.dismiss}
          defaultValueName={this.state.name}
          defaultValueEmail={this.state.email}
          label={'Edit'}
          labelHeader={'Edithing user'}
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
