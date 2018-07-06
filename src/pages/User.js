import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';
import { showUser } from '../services/users';
import projectService from '../services/users2';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {}
    };
  }
  componentDidMount() {
    projectService.getUser(this.props.match.params.userId).then(res => {
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
