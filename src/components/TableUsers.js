import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
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
          {this.props.users.map((item, i) => {
            return (
              <RowTable
                id={item.id}
                name={item.name}
                email={item.email}
                key={item.id}
                showUser={this.showUser}
                {...this.props} //замінив пряму передачу пропсів спредом
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
  //також незнаю чи доречні ці записи при використанні spread
  refreshTableAfterEdit: PropTypes.func,
  refreshTableAfterDelete: PropTypes.func
};
