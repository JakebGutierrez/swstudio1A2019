import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import fire from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/CreateAccount.css';

const minUsernameLength = Globals.constants.criteria.minUsernameLength;
const minEmailLength = Globals.constants.criteria.minEmailLength;
const minPasswordLength = Globals.constants.criteria.minPasswordLength;

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: queryString.parse(this.props.location.search),

      username: "",
      email: "",
      password: "",
      repeatPassword: "",

      errorUsername: false,
      errorEmail: false,
      errorPassword: false,
      errorRepeatPassword: false,

      formSubmittable: false
    };

    this.handleCreateAccount = this.handleCreateAccount.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Create Account`;
  }

  handleCreateAccount(e) {
    e.preventDefault();
    document.getElementById('createAccountButton').blur();

    const usernameTextField = document.getElementById('usernameTextField');
    const emailTextField = document.getElementById('emailTextField');
    const passwordTextField = document.getElementById('passwordTextField');

    if (usernameTextField.value.length === 0) {
      UI.showInfoBox(this, "Please enter your username.", UI.DialogType.WARNING);
      this.setState({ errorUsername: true });
      usernameTextField.focus();

    } else if (emailTextField.value.length === 0) {
      UI.showInfoBox(this, "Please enter your email.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      emailTextField.focus();

    } else if (emailTextField.value.length < minEmailLength) {
      UI.showInfoBox(this, "That doesn't look like a valid email, please try again.", UI.DialogType.WARNING);
      this.setState({ errorEmail: true });
      emailTextField.focus();

    } else if (passwordTextField.value.length === 0) {
      UI.showInfoBox(this, "All accounts must have a strong password with a minimum of 8 characters. Please try again.", UI.DialogType.WARNING);
      this.setState({ errorPassword: true });
      passwordTextField.focus();

    } else if (passwordTextField.value.length < minPasswordLength) {
      UI.showInfoBox(this, `Passwords must be a minimum of ${minPasswordLength} characters.`, UI.DialogType.WARNING);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      passwordTextField.focus();

    } else if (!this.passwordsAreIdentical()) {
      UI.showInfoBox(this, "The passwords you have entered do not match. Please try again.", UI.DialogType.ERROR);
      this.setState({ errorPassword: true, errorRepeatPassword: true });
      passwordTextField.focus();

    } else {
      this.commitCreateAccount();
    }
  }

  passwordsAreIdentical() {
    const passwordTextField = document.getElementById('passwordTextField');
    const repeatPasswordTextField = document.getElementById('repeatPasswordTextField');
    return (passwordTextField.value.length > 0) && (repeatPasswordTextField.value === passwordTextField.value);
  }

  showIfPasswordsAreIdentical() {
    if (!this.passwordsAreIdentical()) {
      UI.showInfoBox(this, "Passwords do not match", UI.DialogType.WARNING, { description: "", page: "" });
    } else {
      if (document.getElementById('passwordTextField').value.length < minPasswordLength) {
        UI.showInfoBox(this, "Passwords too short.", UI.DialogType.WARNING);
      } else {
        UI.showInfoBox(this, "Passwords match");
      }
    }
  }

  isFormSubmittable() {
    const usernameTextField = document.getElementById('usernameTextField');
    const emailTextField = document.getElementById('emailTextField');
    const passwordTextField = document.getElementById('passwordTextField');

    if (usernameTextField && emailTextField && passwordTextField) {
      return (usernameTextField.value.length >= minUsernameLength)
            && (emailTextField.value.length >= minEmailLength)
            && (passwordTextField.value.length >= minPasswordLength)
            && this.passwordsAreIdentical();
    }

    return false;
  }

  commitCreateAccount() {
    UI.showInfoBox(this, "Setting up your account...", UI.DialogType.SUCCESS);

    fire.auth().fetchSignInMethodsForEmail(this.state.email).then(signInMethods => {
      // If the number of sign in methods is 0, that must mean the user doesn't exist
      let userExists = signInMethods.length > 0;

      if (userExists) {
        UI.showInfoBox(this, "An account with the email you provided already exists.", UI.DialogType.ERROR, { description: "Forgot your password?", page: `/forgot-password?from-create-account=yes&selected-role=${this.state.query['selected-role']}` });
      } else {
        this.createUser();
      }
    }).catch(error => {
      this.displayAuthError(error);
    });
  }

  displayAuthError(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        UI.showInfoBox(this, "Hmm, that email doesn't look right. Check that you've entered it correctly and try again.", UI.DialogType.ERROR);
        this.setState({ errorEmail: true });
        this.emailTextField.focus();
        break;
      case 'auth/email-already-in-use':
        UI.showInfoBox(this, "An account with the email you provided already exists.", UI.DialogType.ERROR, { description: "Forgot your password?", page: '/forgot-password' });
        this.setState({ errorEmail: true });
        this.emailTextField.focus();
        break;
      case 'auth/network-request-failed':
          UI.showInfoBox(this, `${Globals.app.name} was unable to connect to the internet. Please check your connection and try again.`, UI.DialogType.ERROR);
          break;
      default:
        UI.showInfoBox(this, error.message, UI.DialogType.ERROR);
        return;
    }
  }

  createUser() {
    const displayInternalError = error => {
      UI.showInfoBox(this, "An internal error occurred: " + error.message, UI.DialogType.ERROR);
    }

    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        console.log("1: Created user");
        console.log("Current user: " + fire.auth().currentUser.uid);

        const currentUser = userCredentials.user;
        const selectedRole = this.state.query['selected-role'];
        const usersDocRef = fire.firestore().doc('users/' + currentUser.uid);
        const charitiesDocRef = fire.firestore().doc('charities/' + currentUser.uid);

        currentUser.sendEmailVerification();
        currentUser.updateProfile({ displayName: this.state.username })
          .then(() => {
            console.log("2: Updated profile with username");

            if (selectedRole === 'volunteer') {
              console.log("User selected 'volunteer'");

              usersDocRef.set({ 'name': this.state.username, 'booked-events': [], 'favourite-events': [] })
                .then(() => {
                  console.log("3: User Firestore properties set. User successfully created! Redirecting...");
                  this.props.history.push('/account-created');
                })
                .catch(error => displayInternalError(error));
            } else if (selectedRole === 'charity') {
              console.log("User selected 'charity'");

              charitiesDocRef.set({ 'name': this.state.username, 'organised-events': [] })
                .then(() => {
                  console.log("3: Charity Firestore properties set. User successfully created! Redirecting...");
                  this.props.history.push('/account-created');
                })
                .catch(error => displayInternalError(error));
            }
          })
          .catch(error => displayInternalError(error));
      })
      .catch(error => displayInternalError(error));
  }

  collapseErrorBox() {
    document.getElementById('infoBoxDiv').hidden = true;
    this.setState({ errorUsername: false, errorEmail: false, errorPassword: false, errorRepeatPassword: false });
  }

  render() {
    const createAccountButtonIsEnabled = this.isFormSubmittable();

    const focusEmailTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('emailTextField').focus();
      }
    }

    const focusPasswordTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('passwordTextField').focus();
      }
    }

    const focusRepeatPasswordTextField = e => {
      if (e.key === 'Enter') {
        document.getElementById('repeatPasswordTextField').focus();
      }
    }

    const submitForm = e => {
      if (e.key === 'Enter') {
        this.handleCreateAccount(e);
      }
    }

    const handleUsernameTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ username: e.target.value });
    }

    const handleEmailTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ email: e.target.value });
    }

    const handlePasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ password: e.target.value });
      this.showIfPasswordsAreIdentical();
    }

    const handleRepeatPasswordTextFieldChange = e => {
      this.collapseErrorBox();
      this.setState({ repeatPassword: e.target.value })
      this.showIfPasswordsAreIdentical();
    }

    return (
      <div className="sign-up-wrapper">
        <UI.BackButton to="/role-selection" from={this}/>
        <div className="sign-up-content">
          <div className="sign-up-heading-group">
            <UI.Heading>Almost done</UI.Heading>
            <UI.Subheading>Just fill in the fields below</UI.Subheading>
          </div>
          <form className="sign-up-form">
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorUsername ? "sign-up-error-text-field-label" : null}>username</UI.Label>
              <UI.TextField id="usernameTextField" className={this.state.errorUsername ? "sign-up-error-text-field" : null} name="username" type="text" placeholder="Username" value={this.state.username} onChange={handleUsernameTextFieldChange.bind(this)} onKeyPress={focusEmailTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorEmail ? "sign-up-error-text-field-label" : null}>email</UI.Label>
              <UI.TextField id="emailTextField" className={this.state.errorEmail ? "sign-up-error-text-field" : null} name="email" type="email" placeholder="Email" value={this.state.email} onChange={handleEmailTextFieldChange.bind(this)} onKeyPress={focusPasswordTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorPassword ? "sign-up-error-text-field-label" : null}>password</UI.Label>
              <UI.TextField id="passwordTextField" className={this.state.errorPassword ? "sign-up-error-text-field" : null} name="password" type="password" placeholder="Password" value={this.state.password} onChange={handlePasswordTextFieldChange.bind(this)} onKeyPress={focusRepeatPasswordTextField.bind(this)} noValidate/>
            </div>
            <div className="sign-up-labeled-textfield">
              <UI.Label htmlFor="label-textfield" className={this.state.errorRepeatPassword ? "sign-up-error-text-field-label" : null}>repeat password</UI.Label>
              <UI.TextField id="repeatPasswordTextField" className={this.state.errorRepeatPassword ? "sign-up-error-text-field" : null} name="repeatPassword" type="password" placeholder="Repeat Password" onChange={handleRepeatPasswordTextFieldChange.bind(this)} onKeyPress={submitForm.bind(this)} noValidate/>
            </div>
            <div id="infoBoxDiv" className="sign-up-info-box-div" hidden={true}/>
          </form>
          <div className="sign-up-create-button-container">
            <UI.Button primary id="createAccountButton" type="submit" disabled={!createAccountButtonIsEnabled} onClick={this.handleCreateAccount}>CREATE ACCOUNT</UI.Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateAccount);