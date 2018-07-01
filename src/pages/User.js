import React, { Component } from 'react';

import { Well, PageHeader, Panel } from 'react-bootstrap';
import { showUser } from '../services/users';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {}
    };
  }
  componentDidMount() {
    showUser(this.props.match.params.userId).then(res => {
      this.setState({ obj: res });
    });
  }

  render() {
    return (
      <div>
        <PageHeader>{this.state.obj.name}</PageHeader>
        <Well bsSize="small">ID: {this.state.obj.id}</Well>
        <Well bsSize="small">E-mail: {this.state.obj.email}</Well>
      </div>
    );
  }
}

//propTypes не задаютьсяв цьому випадку?
