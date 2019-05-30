import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Profile.css';

class Profile extends Component {
  componentDidMount() {
    document.title = `${Globals.app.name} – Profile`;
  }

  render() {
    return (
      <div className="profile-wrapper">
        <div className="profile-title-bar">
          <UI.TitleBar title="Profile"/>
        </div>
        <div className="profile-content">

        </div>
      </div>
    );
  }
}

export default withRouter(Profile);