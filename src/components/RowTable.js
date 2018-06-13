import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'react-bootstrap';
import Edit from './Edit';
import { deleteFetch } from '../services/users';

class RowTable extends Component {
  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
    this.hendleDelete = this.hendleDelete.bind(this);
  }

  renderEdit(event) {
    const id = event.target.id;
    ReactDOM.render(
      <Edit name={this.props.name} email={this.props.email} id={id} />,
      document.getElementById('root')
    );
  }

  hendleDelete(event) {
    const id = event.target.id;
    deleteFetch(id);
  }

  render() {
    // console.log(this.props);
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            id={this.props.id}
            onClick={this.renderEdit}
          >
            Edit
          </Button>
          <span> </span>
          {/* //тут також памятаю з відео використовували key. в 
          //даному випадку це підійшло б?  */}
          <Button
            bsStyle="warning"
            bsSize="xsmall"
            id={this.props.id}
            onClick={this.hendleDelete}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default RowTable;
