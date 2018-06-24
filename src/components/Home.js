import React, { Component } from 'react';

import { Well, PageHeader } from 'react-bootstrap';
import { showUser } from '../services/users';

export default class ViewInfoUser extends Component {
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
