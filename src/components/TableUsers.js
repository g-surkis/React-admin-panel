import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import RowTable from './RowTable';

class TableUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUser: false,
      dataUser: {}
    };
    this.showUser = this.showUser.bind(this);
  }

  showUser(value, data) {
    this.setState({ showUser: value });
    this.setState({ dataUser: data });
  }

  render() {
    if (this.state.showUser) {
      return this.state.dataUser;
    } else {
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
                  showUser={this.showUser} //тут застосував колбек, так добре?
                />
              );
            })}
          </tbody>
        </Table>
      );
    }
  }
}

export default TableUsers;

TableUsers.propTypes = {
  arr: PropTypes.array
};
