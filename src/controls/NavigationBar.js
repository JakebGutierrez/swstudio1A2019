import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalBorderProps = Globals.constants.styles.border;

const styles = css`
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .navigation-bar {
    height: 75px;

    display: flex;
    align-items: center;

    background: ${globalColours.basic.pure};
    border-top: ${globalBorderProps.size} solid ${globalColours.grey.dark};

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .navigation-bar-content {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .navigation-bar-icon-container {
    display: flex;
    height: 100%;
    width: 100%;
    /* justify-content: stretch; */
    /* align-items: center; */
    /* overflow: hidden; */
  }

  .navigation-bar-icon {
    object-fit: none;
    width: 100%;
    transform: scale(1);
    transition: all 300ms;
  }

  .navigation-bar-icon-selected {
    object-fit: none;
    width: 100%;
    transform: scale(1.2);
    transition: all 300ms;
  }
`;

const NavigationBarIcon = ({ icon, selected=false, onClick }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <img className={selected ? "navigation-bar-icon-selected" : "navigation-bar-icon"} src={`assets/icons/navigation/${selected ? `selected/${icon}` : `${icon}`}.svg`} alt={`${icon} page`} onClick={onClick}/>
    </>
  );
}

export const NavigationBar = ({ tabBarView, currentIndex=0 }) => {
  const switchTab = (newIndex) => {
    switch (newIndex) {
      case 0:
        tabBarView.showTabPage('home', newIndex)
        break;
      case 1:
        tabBarView.showTabPage('bookings', newIndex)
        break;
      case 2:
        tabBarView.showTabPage('favourites', newIndex)
        break;
      case 3:
        tabBarView.showTabPage('profile', newIndex)
        break;
      default:
        tabBarView.showTabPage('home', newIndex)
        break;
    }
  };

  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="navigation-bar">
        <div className="navigation-bar-content">
          <div className="navigation-bar-icon-container">
            <NavigationBarIcon icon="home" selected={currentIndex === 0} onClick={() => switchTab(0)}/>
            <NavigationBarIcon icon="bookings" selected={currentIndex === 1} onClick={() => switchTab(1)}/>
            <NavigationBarIcon icon="favourites" selected={currentIndex === 2} onClick={() => switchTab(2)}/>
            <NavigationBarIcon icon="profile" selected={currentIndex === 3} onClick={() => switchTab(3)}/>
          </div>
        </div>
      </div>
    </>
  );
}