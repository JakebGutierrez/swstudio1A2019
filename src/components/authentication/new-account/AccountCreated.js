import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../../controls/UI';
import './styles/AccountCreated.css';

class AccountCreated extends Component {
  render() {
    return (
      <div className="account-created-wrapper">
        <div className="account-created-content">
          <div className="account-created-message">
            <img src="/assets/icons/tick.svg" alt="tick"/>
            <UI.Heading>Account created</UI.Heading>
            <UI.Subheading id="account-created-subheading">We've sent a verification link to your email. In the meantime, why not take a tour?</UI.Subheading>
          </div>
          <div className="account-created-button-group">
            <UI.Button primary onClick={() => this.props.history.push('/home?tour=yes')}>LET'S GO!</UI.Button>
            <UI.Button onClick={() => this.props.history.push('/home')}>NO THANKS</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AccountCreated);