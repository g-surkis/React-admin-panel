import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Button, Modal } from 'react-bootstrap';
import { showAlert } from './shared/alert';
import projectService from '../services/users';

export default class DeleteUser extends Component {
  constructor(props) {
    super(props);

    // this.element = document.getElementById('root');

    this.state = {
      showDeleteModalWindow: true,
      showAlert: false
    };

    this.acceptDelete = this.acceptDelete.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.deleteModalWindow = this.deleteModalWindow.bind(this);
  }

  acceptDelete() {
    projectService
      .delete(this.props.idDelete)
      .then(res => {
        this.setState({ showAlert: true });
        this.props.refreshTableAfterDelete(+this.props.idDelete);
      })
      .catch(function(res) {
        console.log(res.Body);
      });
  }

  dismiss() {
    this.setState({ showAlert: false });
    this.props.hideDeleteWindow();
  }

  deleteModalWindow() {
    return (
      <tr className="deleteRow">
        <td>{this.props.idDelete}</td>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Delete User?</Modal.Title>
            </Modal.Header>

            <Modal.Body>Warning! Removal is irreversible </Modal.Body>

            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.acceptDelete}>
                Delete
              </Button>
              <Button bsStyle="info" onClick={this.props.hideDeleteWindow}>
                Cencel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </td>
      </tr>
    );
  }
  //тут не можу зловити помилку при ситуації коли додаєш нового користувачаі не обновляючи сторінку відразу його видаляти
  //я переклав в перекладачі, не розумію чому того користувача реакт вважає немонтованим, якщо для нього появляється
  //окремий компонент <RowTable>
  // Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak
  //in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
  //   in DeleteUser (at RowTable.js:71)

  render() {
    if (this.state.showAlert) {
      return (
        <tr>
          <td>{showAlert('User was deleted', 'info', this.dismiss)}</td>
        </tr>
      );
    }
    if (this.state.showDeleteModalWindow) {
      return this.deleteModalWindow();
    }
  }
}

DeleteUser.propTypes = {
  cancelDelete: PropTypes.func,
  idDelete: PropTypes.number,
  successDelete: PropTypes.func,
  refreshTableAfterDelete: PropTypes.func
};
