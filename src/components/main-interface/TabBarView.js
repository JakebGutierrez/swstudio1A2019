import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as UI from '../../controls/UI';
import './styles/TabBarView.css';

import Home from './Tabs/Home';
import Bookings from './Tabs/Bookings';
import Favourites from './Tabs/Favourites';
import Profile from './Tabs/Profile';

class TabBarView extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      currentIndex: this.props.currentIndex
    });

    console.log(this.state.currentIndex);
  }

  getComponentAtCurrentIndex() {
    switch (this.state.currentIndex) {
      case 0:
        return <Home/>;
      case 1:
        return <Bookings/>;
      case 2:
        return <Favourites/>;
      case 3:
        return <Profile/>;
      default:
        return <Home/>;
    }
  }

  showTabPage(page, index) {
    this.props.history.push(`/${page}`);
    this.setState({ currentIndex: index });
  }

  render() {
    return (
      <div className="tab-bar-view-wrapper">
        <div className="tab-bar-content">
          {this.getComponentAtCurrentIndex()}
        </div>
        <div className="tab-bar-navigation-bar">
          <UI.NavigationBar tabBarView={this} currentIndex={this.state.currentIndex}/>
        </div>
      </div>
    );
  }
}

export default withRouter(TabBarView);