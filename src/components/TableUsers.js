import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead className="head">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((item, i) => {
            return (
              <RowTable
                id={item.id}
                name={item.name}
                email={item.email}
                key={item.id}
                showUser={this.showUser}
                {...this.props}
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
  users: PropTypes.array,
  refreshTableAfterEdit: PropTypes.func,
  refreshTableAfterDelete: PropTypes.func
};
