import React, { Component } from 'react';
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button, Modal } from 'react-bootstrap';
import EditUser from './EditUser';
import { deleteUser } from '../services/users';
import { showAlert } from './shared/alert';

class RowTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chekingDelete: false,
      showAlert: false,
      idDelete: 1000,
      idEdit: 1000,
      showUser: false,
      edit: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.acceptDelete = this.acceptDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.successDelete = this.successDelete.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
    this.deleteModalWindow = this.deleteModalWindow.bind(this);
    this.hideEditWindow = this.hideEditWindow.bind(this);
  }

  handleEdit(event) {
    this.setState({ idEdit: event.target.id, edit: true });
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
    showAlert('User was deleted', 'info', this.handleDismiss);
  }

  handleDismiss() {
    this.setState({ showAlert: false });
  }

  cancelDelete() {
    this.setState({ chekingDelete: false });
  }

  hideEditWindow(value) {
    this.setState({ edit: value });
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

  render() {
    if (this.state.chekingDelete) {
      return this.deleteModalWindow();
    } else if (this.state.edit) {
      return (
        <EditUser
          name={this.props.name}
          email={this.props.email}
          userId={this.state.idEdit}
          hideEditWindow={this.hideEditWindow}
          refreshTableAfterEdit={this.props.refreshTableAfterEdit}
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
