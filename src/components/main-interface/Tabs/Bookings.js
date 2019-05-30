import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Bookings.css';

class Bookings extends Component {
  componentDidMount() {
    document.title = `${Globals.app.name} – Bookings`;
  }

  render() {
    return (
      <div className="bookings-wrapper">
        <div className="bookings-title-bar">
          <UI.TitleBar title="Bookings" hasSearchIcon={true}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Bookings);