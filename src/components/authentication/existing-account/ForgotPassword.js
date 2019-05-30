import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import fire from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      query: queryString.parse(this.props.location.search),
      email: "",
      errorEmail: false
    });
  }

  handleSendResetLink(e) {
    e.preventDefault();

    UI.showInfoBox(this, "Sending link...", UI.DialogType.SUCCESS);

    if (document.getElementById('emailTextField').value.length === 0) {
      UI.showInfoBox(this, "Please enter your email.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();
    } else {
      fire.auth().sendPasswordResetEmail(this.state.email)
        .then(() => this.props.history.push('/link-sent'))
        .catch(error => this.displayAuthError(error));
    }
  }

  displayAuthError(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        UI.showInfoBox(this, "Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/user-not-found':
        UI.showInfoBox(this, "That's weird, we don't have a user with that email. Maybe you typed it in incorrectly?", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        break;
      case 'auth/network-request-failed':
        UI.showInfoBox(this, `${Globals.app.name} was unable to connect to the internet. Please check your connection and try again.`, UI.DialogType.ERROR);
        break;
      default:
        UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
        console.log(error);
        return;
    }
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorEmail: false })
  }

  render() {
    const isEnabled = this.state.email.length >= 3;

    const handleEmailTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ email: e.target.value });
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleSendResetLink(e);
      }
    }

    return (
      <div className="forgot-password-wrapper">
        <UI.BackButton to={this.state.query['from-create-account'] ? `/create-account?selected-role=${this.state.query['selected-role']}` : '/login'} from={this}/>
        <div className="forgot-password-content">
          <div className="forgot-password-heading-group">
            <UI.Heading>No worries</UI.Heading>
            <UI.Subheading>Just enter your email below and we'll send you a link to reset your password</UI.Subheading>
          </div>
          <form className="forgot-password-form">
            <div className="forgot-password-labeled-textfield">
              <UI.Label htmlFor="labeled-textfield" className={this.state.errorEmail ? "forgot-password-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "forgot-password-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
            <div id="infoBoxDiv" className="forgot-password-info-box-div" hidden={true}/>
          </form>
          <div className="forgot-password-button-container">
            <UI.Button primary id="sendLinkButton" type="submit" disabled={!isEnabled} onClick={this.handleSendResetLink.bind(this)}>SEND LINK</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);