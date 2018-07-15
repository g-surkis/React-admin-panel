import React, { Component } from 'react';

import { PageHeader } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <PageHeader>
          <small>React Admin Panel</small>
        </PageHeader>

        <p className="copyrigth">&copy; 2018</p>
      </div>
    );
  }
}
