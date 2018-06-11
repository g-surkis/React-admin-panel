import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //  console.log(this.props);
    return (
      // таке використання bootstrap допустиме?
      <Table id="users" striped bordered condensed hover>
        <thead>
          <tr>
            <th className="head">Id</th>
            <th className="head">Name</th>
            <th className="head">Email</th>
            <th className="head">Actions</th>
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
                key={i}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default TableUsers;
