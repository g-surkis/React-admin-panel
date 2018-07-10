import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { showAlert } from './shared/alert';

import projectService from '../services/users';
import ModalDialog from './ModalDialog';

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
    this.props.hideDialogWindow(false);
  }

  handleForm(userData) {
    let id = this.props.userId;

    if (this.props.label === 'Edit') {
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
    if (this.props.label === 'Add') {
      projectService
        .post(userData)
        .then(res => {
          id = res.id;
          this.props.refreshTable({
            name: userData.name,
            email: userData.email,
            id
          });
          this.setState({ showAlert: true });
        })
        .catch(res => {
          showAlert('Somethisng was wrong', 'danger', this.dismiss);
        });
    }
  }

  //класний метод) я його використовував при попередніх обєднаннях, а зараз якщо чесно то забув для чого
  static getDerivedStateFromProps(nextProps, prevState) {
    return { name: nextProps.name, email: nextProps.email };
  }

  //   при демонтажі жаного компонента надсилаються state, я не можу їх відловити
  render() {
    if (this.state.showAlert) {
      console.log(this.props);

      return showAlert(
        this.props.textAlert,
        this.props.styleAlert,
        this.dismiss
      );
    }

    return (
      <ModalDialog
        handleAction={this.handleForm}
        dismiss={this.dismiss}
        onChangeName={this.handleAddName}
        onChangeEmail={this.handleAddEmail}
        defaultValueName={this.state.name}
        defaultValueEmail={this.state.email}
        label={this.props.label}
        labelHeader={this.props.labelHeader}
        changingEfect={this.props.changingEfect}
      />
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
