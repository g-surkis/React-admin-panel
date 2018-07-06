import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div>
        <PageHeader>
          <small>React Admin Panel</small>
        </PageHeader>
        <Well bsSize="small">Author: G.Pinkas</Well>
        <Well bsSize="small">Tutor: VolVol</Well>

        <p className="copyrigth">&copy; Warsaw, 2018</p>
      </div>
    );
  }
}
