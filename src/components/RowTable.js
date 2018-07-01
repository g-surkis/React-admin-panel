import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';
import AddEditUser from './AddEditUser';
import { deleteUser } from '../services/users';
import { showAlert } from './shared/alert';
import { updateUser } from '../services/users';

class RowTable extends Component {
  //цей компонент мені здається дуже великим
  constructor(props) {
    super(props);

    this.state = {
      chekingDelete: false,
      showAlert: false,
      idDelete: 1000,
      idEdit: 1000,
      edit: false,
      successEdit: false
    };

    this.editUser = this.editUser.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.acceptDelete = this.acceptDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.deleteModalWindow = this.deleteModalWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
  }

  handleEdit(event) {
    this.setState({ idEdit: +event.target.id, edit: true });
  }

  handleDelete(event) {
    this.setState({
      idDelete: event.target.id,
      nameWillDelete: event.target.username,
      chekingDelete: true
    });
  }

  acceptDelete() {
    deleteUser(this.state.idDelete)
      .then(res => {
        this.successDelete();
      })
      .catch(function(res) {});
    this.setState({ chekingDelete: false });
  }

  successDelete() {
    this.props.refreshTableAfterDelete(+this.state.idDelete);
    showAlert('User was deleted', 'info', this.dismiss);
  }

  dismiss() {
    this.setState({ showAlert: false });
  }

  cancelDelete() {
    this.setState({ chekingDelete: false });
  }

  hideEditWindow() {
    this.setState({ edit: false });
  }

  deleteModalWindow() {
    return (
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Delete User?</Modal.Title>
        </Modal.Header>

        <Modal.Body>Warning! Removal is irreversible </Modal.Body>

        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.acceptDelete}>
            Delete
          </Button>
          <Button bsStyle="info" onClick={this.cancelDelete}>
            Cencel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }

  editUser(userData, id) {
    updateUser(id, userData) //в даному методі не потрібно тіла відповіді сервера, тому json() не роблю
      .then(res => {
        this.setState({ showAlert: true, edit: false, successEdit: true });
        this.props.refreshTableAfterEdit({
          id: +id,
          name: userData.name,
          email: userData.email
        });
      })
      .catch(res => {
        this.setState({ showAlert: true, edit: false, successEdit: false });
      });
  }

  render() {
    if (this.state.showAlert === true && this.state.successEdit === true) {
      return showAlert('User was editing', 'info', this.dismiss);
    }
    if (this.state.showAlert === true && this.state.successEdit === false) {
      return showAlert(
        'Editing is not successful. Try again.',
        'warning',
        this.dismiss
      );
    }
    if (this.state.chekingDelete) {
      return this.deleteModalWindow();
    }
    if (this.state.edit) {
      return (
        <AddEditUser
          name={this.props.name}
          email={this.props.email}
          userId={this.state.idEdit}
          hideEditWindow={this.hideEditWindow}
          method={this.editUser}
          textAlert={'Congratulations! You jast have corrected user data!.'}
          styleAlert={'info'}
          textWindow={'Editing user'}
          action={'Edit'} //здається те саме виходить що я робив раніше, тільки без умов
        />
      );
    } else {
      return (
        <tr>
          <td>
            <Link to={`/user/${this.props.id}`}>{this.props.id}</Link>
          </td>
          <td>{this.props.name}</td>
          <td>{this.props.email}</td>
          <td>
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              id={this.props.id}
              onClick={this.handleEdit}
            >
              Edit
            </Button>
            <span> </span>

            <Button
              bsStyle="warning"
              bsSize="xsmall"
              id={this.props.id}
              onClick={this.handleDelete}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }
  }
}

export default RowTable;

RowTable.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  refreshTableAfterEdit: PropTypes.func
};
