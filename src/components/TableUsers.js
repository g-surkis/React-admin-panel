import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataUser: {}
    };
  }

  render() {
    return (
      <Table id="users" striped bordered condensed hover>
        <thead className="head">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.arr.map((item, i) => {
            return (
              <RowTable
                id={item.id}
                name={item.name}
                email={item.email}
                key={item.id}
                showUser={this.showUser}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}
export default TableUsers;

TableUsers.propTypes = {
  arr: PropTypes.array
};
