import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import fire from '../../config/Fire';
import Globals from '../../Globals';
import * as UI from '../../controls/UI';
import './styles/Start.css';

class Start extends Component {
  componentDidMount() {
    document.title = `${Globals.app.name} – Start`;

    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/home');
      }
    });
  }

  render() {
    return(
      <div className="start-wrapper">
        <div className="start-content">
          <div className="start-title-group">
            <UI.Title>TIME AID</UI.Title>
            <UI.Caption>Your time spent on good causes</UI.Caption>
          </div>
          <div className="start-button-group">
            <UI.Button primary onClick={() => this.props.history.push('/login')}>LOGIN</UI.Button>
            <UI.Button onClick={() => this.props.history.push('/create-account')}>SIGN UP</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Start);