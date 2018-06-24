import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';
import { showUser } from '../services/users';

export default class ViewInfoUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {}
    };
  }
  componentDidMount() {
    showUser(this.props.match.params.userId)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({ obj: res });
      });
  }

  render() {
    return (
      <div>
        <PageHeader>
          {this.state.obj.name} <small>Info</small>
        </PageHeader>
        <Well bsSize="small">ID: {this.state.obj.id}</Well>
        <Well bsSize="small">E-mail: {this.state.obj.email}</Well>
      </div>
    );
  }
}

//propTypes не задаютьсяв цьому випадку?
