import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
// import {Grid, Button, Navbar, Table} from 'react-bootstrap';
import AddUser from './AddUser';
import TableUsers from './TableUsers';

//const history = createBrowserHistory();

class Users extends Component {
  constructor(props) {
    super(props);
    //this.numId = 0;
    this.state = {
      addUser: false,
      arr: []
    };

    //@ краще в одну стрічку
    //#в мене стоїть плагін для форматування коду.
    //там потрібно покопатись в настройках. в майбутньому врахую

    this.addUser = this.addUser.bind(this);
    this.loadData = this.loadData.bind(this);
    this.renderTableWithButton = this.renderTableWithButton.bind(this);
    this.renderSimpleTable = this.renderSimpleTable.bind(this);
  }

  addUser() {
    this.setState({ addUser: true });
  }

  buttonsAdd() {
    return (
      <td>
        <button className="btn-success" />
        <button className="btn-warning" />
      </td>
    );
  }

  componentWillMount() {
    // will or did? what better?
    this.loadData();
  }

  async loadData() {
    const rawResponse = await fetch('http://localhost:3001/users');
    const content = await rawResponse.json();
    //await console.log(content);
    this.setState({ arr: content });
  }

  renderSimpleTable() {
    return (
      <div className="container">
        <div className="emptySpace" />
        <button onClick={this.addUser} className="btn btn-success">
          Add user!
        </button>
        <div className="emptySpace" />
        <TableUsers arr={this.state.arr} />
      </div>
    );
  }
  renderTableWithButton() {
    return (
      <div>
        <div>
          <AddUser />
        </div>

        <div className="container">
          <TableUsers arr={this.state.arr} />
        </div>
      </div>
    );
  }

  render() {
    if (this.state.add) {
      return this.renderTableWithButton();
    } else {
      return this.renderSimpleTable();
    }
  }
}

export default Users;
