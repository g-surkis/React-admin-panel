import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';

export default class ViewInfoUser extends Component {
  render() {
    return (
      <div>
        <PageHeader>
          ID {this.props.data.id} <small>Info</small>
        </PageHeader>
        <Well bsSize="small">{this.props.data.name}</Well>
        <Well bsSize="small">{this.props.data.email}</Well>
      </div>
    );
  }
}

ViewInfoUser.propTypes = {
  data: {}
};
