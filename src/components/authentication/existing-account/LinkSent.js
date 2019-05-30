import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../../controls/UI';
import './styles/LinkSent.css';

class LinkSent extends Component {
  render() {
    return (
      <div className="link-sent-wrapper">
        <div className="link-sent-content">
          <div className="link-sent-message">
            <img src="/assets/icons/tick.svg" alt="tick"/>
            <UI.Heading>Link sent</UI.Heading>
            <UI.Subheading id="link-sent-subheading">Check your inbox to see if you've received a reset link. You may need to check your junk folder.</UI.Subheading>
          </div>
          <div className="link-sent-button-group">
            <UI.Button primary onClick={() => this.props.history.push('/start')}>DONE</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LinkSent);