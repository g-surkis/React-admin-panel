import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';
import projectService from '../services/users';

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    projectService.getUser(this.props.match.params.userId).then(res => {
      this.setState({ user: res });
    });
  }

  render() {
    return (
      <div>
        <PageHeader>{this.state.user.name}</PageHeader>
        <Well bsSize="small">ID: {this.state.user.id}</Well>
        <Well bsSize="small">E-mail: {this.state.user.email}</Well>
      </div>
    );
  }
}
