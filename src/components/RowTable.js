import React, { Component } from 'react';
import ReactDOM from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import AddEditUser from './AddEditUser';
import DeleteUser from './DeleteUser';

class RowTable extends Component {
  constructor(props) {
    super(props);

    this.element = document.getElementById('alert');

    this.state = {
      chekingDelete: false,
      idDelete: 1000,
      idEdit: 1000,
      showUser: false,
      edit: false,
      nameChanging: this.props.name,
      emailChanging: this.props.email
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.hideDeleteWindow = this.hideDeleteWindow.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.hideDialogWindow = this.hideDialogWindow.bind(this);
    this.changingEfect = this.changingEfect.bind(this);
  }

  handleEdit(event) {
    this.setState({ idEdit: event.target.id, edit: true });
  }

  handleDelete(event) {
    this.setState({
      idDelete: event.target.id,
      chekingDelete: true
    });
  }

  dismiss() {
    this.setState({ showAlert: false });
  }

  hideDeleteWindow() {
    this.setState({ chekingDelete: false });
  }

  hideDialogWindow(value) {
    this.setState({ edit: value });
  }

  changingEfect(name, email) {
    this.setState({ nameChanging: name, emailChanging: email });
  }

  render() {
    //   const deleteUser = <DeleteUser
    //   hideDeleteWindow={this.hideDeleteWindow}
    //   idDelete={+this.state.idDelete}
    //   successDelete={this.successDelete}
    //   refreshTableAfterDelete={this.props.refreshTableAfterDelete}
    // />
    if (this.state.chekingDelete) {
      //знову вебпак видає createPortal is not a function
      //this.element тепер існує завжди
      // return ReactDOM.createPortal(
      //   <DeleteUser
      //   hideDeleteWindow={this.hideDeleteWindow}
      //   idDelete={+this.state.idDelete}
      //   successDelete={this.successDelete}
      //   refreshTableAfterDelete={this.props.refreshTableAfterDelete}
      //   name={this.props.name}
      //   email={this.props.email}
      // />,
      //   this.element
      // );
      return (
        <DeleteUser
          hideDeleteWindow={this.hideDeleteWindow}
          idDelete={+this.state.idDelete}
          successDelete={this.successDelete}
          refreshTableAfterDelete={this.props.refreshTableAfterDelete}
          name={this.props.name}
          email={this.props.email}
        />
      );
    } else if (this.state.edit) {
      return (
        <tr className="new_row">
          <td>
            {this.state.idEdit}
            <AddEditUser
              label={'Edit'}
              labelHeader={'Edding user'}
              name={this.props.name}
              email={this.props.email}
              userId={+this.state.idEdit}
              hideDialogWindow={this.hideDialogWindow}
              refreshTableAfterEdit={this.props.refreshTableAfterEdit}
              changingEfect={this.changingEfect}
              textAlert={'Congratulations! You jast have corrected user data!.'}
              styleAlert={'info'}
            />
          </td>
          <td>{this.state.nameChanging}</td>
          <td>{this.state.emailChanging}</td>
          <td />
        </tr>
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
