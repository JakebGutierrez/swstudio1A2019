import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import queryString from 'query-string';

import fire from '../../../config/Fire';
import Globals from '../../../Globals';
import * as UI from '../../../controls/UI';
import './styles/Home.css';

import { attemptGetCurrentUser } from '../../../App';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      query: queryString.parse(this.props.location.search),
      user: null
    });

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    document.title = `${Globals.app.name} – Home`;

    attemptGetCurrentUser(10)
      .then(user => this.setState({ user }))
      .catch(error => {
        console.log(error);
        this.props.history.push('/login?kicked-out=yes');
      });

    if (this.state.query['tour']) {
      this.showTour();
    }
  }

  showTour() {
    console.log("UNIMPLEMENTED");
  }

  logout() {
    fire.auth().signOut();
    this.props.history.push('/start');
  }

  loadingScreen() {
    const globalColours = require('../../../Globals').default.constants.styles.colours

    return (
      <div className="home-loading-container">
        <PulseLoader color={globalColours.grey.contrast} size={12} margin={'7px'}/>
      </div>
    );
  }

  cardScreen() {
    return (
      <div className="home-cards">
        <UI.EventCard image="/assets/events/clothing_store.jpg" name="Hand-Me-Downs" organisation="The Clothing Store"/>
      </div>
    );
  }

  render() {
    return (
      <div className="home-wrapper">
        <div className="home-title-bar">
          <UI.TitleBar title="Home" hasSearchIcon={true}/>
        </div>
        <div className="home-content">
          <div className="home-cards-container">
            {this.state.user ? this.cardScreen() : this.loadingScreen()}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);