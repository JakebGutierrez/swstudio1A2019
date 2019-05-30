import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import fire from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Login.css';

const minPasswordLength = Globals.constants.criteria.minPasswordLength;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(this.props.location.search),
      email: "",
      password: "",
      errorEmail: false,
      errorPassword: false
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Login`;

    if (this.state.query['kicked-out']) {
      UI.showInfoBox(this, "You've been signed out. Please sign in again.", UI.DialogType.ERROR);
    }
  }

  handleLogin(e) {
    e.preventDefault();

    document.getElementById('loginButton').blur();

    const emailTextField = document.getElementById('emailTextField');
    const passwordTextField = document.getElementById('passwordTextField');

    UI.showInfoBox(this, "Logging you in...", UI.DialogType.SUCCESS);

    if (emailTextField.value.length === 0 && passwordTextField.value.length === 0) {
      UI.showInfoBox(this, "Please enter your email and password.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true, errorPassword: true });
      document.getElementById('emailTextField').focus();

    } else if (emailTextField.value.length === 0) {
      UI.showInfoBox(this, "Please enter your email.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      document.getElementById('emailTextField').focus();

    } else if (passwordTextField.value.length === 0) {
      UI.showInfoBox(this, "Please enter your password.", UI.DialogType.WARNING);
      this.setState({ errorPassword: true });
      document.getElementById('passwordTextField').focus();

    } else {
      this.commitLogin();
    }
  }

  commitLogin() {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
      this.props.history.push('/home');
    }).catch(error => {
      this.displayAuthError(error);
    });
  }

  displayAuthError(error) {
    this.setState({ password: "" });

    document.getElementById('loginButton').disabled = true;

    switch (error.code) {
      case 'auth/invalid-email':
        UI.showInfoBox(this, "Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/user-not-found': // Fallthrough
      case 'auth/wrong-password':
        UI.showInfoBox(this, "Something's not right... Perhaps you've entered your email or password incorrectly?", UI.DialogType.ERROR);
        break;
      case 'auth/user-disabled':
        UI.showInfoBox(this, "It appears that this account has been disabled. Please contact support for more information.", UI.DialogType.ERROR);
        document.getElementById('emailTextField').focus();
        break;
      case 'auth/too-many-requests':
        UI.showInfoBox(this, "Woah, slow down! Look's like you've requested too many requests.", UI.DialogType.ERROR);
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
    this.setState({ errorEmail: false, errorPassword: false });
  }

  render() {
    const isEnabled = this.state.email.length >= 3 && this.state.password.length >= minPasswordLength;

    const focusPasswordField = e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('passwordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleLogin(e);
      }
    }

    const handleEmailTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ email: e.target.value });
    }

    const handlePasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ password: e.target.value });
    }

    return (
      <div className="login-wrapper">
        <UI.BackButton to="/start" from={this}/>
        <div className="login-content">
          <div className="login-heading-group">
            <UI.Heading>Welcome back!</UI.Heading>
            <UI.Subheading>Let's sign into your account</UI.Subheading>
          </div>
          <form className="login-form">
            <div className="login-labeled-textfield">
              <UI.Label htmlFor="labeled-textfield" className={this.state.errorEmail ? "login-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "login-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordField.bind(this)} noValidate/>
            </div>
            <div className="login-labeled-textfield">
              <UI.Label htmlFor="labeled-textfield" className={this.state.errorPassword ? "login-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "login-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
            <div className="login-forgot-password-container">
              <UI.Button hint className="login-forgot-password-button" onClick={() => this.props.history.push('/forgot-password')}>Forgot your password?</UI.Button>
            </div>
            <div id="infoBoxDiv" className="login-info-box-div" hidden={true}/>
          </form>
          <div className="login-submit-button-container">
            <UI.Button primary id="loginButton" type="submit" disabled={!isEnabled} onClick={this.handleLogin}>SIGN IN</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);