import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Favourites.css';

class Favourites extends Component {
  componentDidMount() {
    document.title = `${Globals.app.name} – Favourites`;
  }

  render() {
    return (
      <div className="favourites-wrapper">
        <div className="favourites-title-bar">
          <UI.TitleBar title="Favourites" hasSearchIcon={true}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Favourites);