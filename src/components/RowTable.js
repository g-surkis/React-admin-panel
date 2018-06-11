import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Button } from 'react-bootstrap';
import Edit from './Edit';

class RowTable extends Component {
  constructor(props) {
    super(props);

    this.renderEdit = this.renderEdit.bind(this);
  }

  renderEdit() {
    ReactDOM.render(
      <Edit name={this.props.name} email={this.props.email} />,
      document.getElementById('root')
    );
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
            key={this.props.id}
            onClick={this.renderEdit}
          >
            Edit
          </Button>
          <span> </span>
          <Button bsStyle="warning" bsSize="xsmall" key={this.props.id}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default RowTable;
