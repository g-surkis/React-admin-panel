import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  constructor(props) {
    // якщо це видалити, то обновлення таблиці не працює
    super(props);
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
          {this.props.users.map((item, i) => {
            return (
              <RowTable
                id={item.id}
                name={item.name}
                email={item.email}
                key={item.id}
                showUser={this.showUser}
                refreshTableAfterEdit={this.props.refreshTableAfterEdit}
                refreshTableAfterDelete={this.props.refreshTableAfterDelete}
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
  users: PropTypes.array
};
