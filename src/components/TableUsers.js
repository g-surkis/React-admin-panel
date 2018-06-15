import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  render() {
    //  console.log(this.props);
    return (
      // таке використання bootstrap допустиме?
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
            //       console.log(i);
            return (
              <RowTable
                id={item.id}
                name={item.name}
                email={item.email}
                key={item.id}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default TableUsers;
