import React from 'react';
import styled, { css } from 'styled-components';

import Globals from '../Globals';
import * as UI from '../controls/UI';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

let animationDuration = 300;

const styles = css`
  .title-bar {
    height: 100px;

    display: flex;
    align-items: flex-start;
    background: ${globalColours.basic.pure};
    border-bottom: ${globalBorderProps.size} solid ${globalColours.grey.dark};

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    overflow-y: hidden;

    transition: height ${animationDuration}ms ease;
  }

  .title-bar-searching {
    height: 100vh;
  }

  .title-bar-content {
    width: 100%;
    margin-top: 40px;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 10px;
  }

  .title-bar-items {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-bar-search-container {
    position: relative;
    width: 100%;
  }

  .title-bar-search-header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .title-bar-search-query {
    height: 0px;
    width: 100%;
    overflow-y: hidden;

    margin-top: 20px;
  }

  .title-bar-search-query-closing {
    height: 0px;
    transition: height ${animationDuration}ms ease;
  }

  .title-bar-search-query-searching {
    height: calc(100vh - 170px);
    transition: height ${animationDuration}ms ease;
  }

  .title-bar-heading {
    opacity: 1;
    transform: translateX(0%);
    transition: all ${animationDuration}ms ease;
  }

  .title-bar-heading-searching {
    opacity: 0;
    transform: translateX(-20px);
  }

  @keyframes slide-left {
    from {
      right: 20px;
    }
    to {
      right: calc(100% - (26px + 40px + 20px));
    }
  }

  @keyframes slide-right {
    from {
      right: calc(100% - (26px + 40px + 20px));
    }
    to {
      right: 20px;
    }
  }

  @-webkit-keyframes slide-left {
    from {
      right: 20px;
    }
    to {
      right: calc(100% - (26px + 40px + 20px));
    }
  }

  @-webkit-keyframes slide-right {
    from {
      right: calc(100% - (26px + 40px + 20px));
    }
    to {
      right: 20px;
    }
  }

  .title-bar-search-icon {
    position: fixed;
    right: 20px;
    width: 26px;
    padding: 20px;
  }

  .title-bar-search-icon-closing {
    animation: slide-right ${animationDuration}ms ease forwards;
  }

  .title-bar-search-icon-searching {
    /* animation: slide-left ${animationDuration}ms cubic-bezier(0.23, 1.25, 0.46, 1) forwards; */
    animation: slide-left ${animationDuration}ms ease forwards;
  }

  .title-bar-close-icon {
    opacity: 0;
    position: fixed;
    right: 20px;
    width: 30px;
    padding: 20px;

    pointer-events: none;
  }

  .title-bar-close-icon-closing {
    opacity: 0;
    transition: opacity ${animationDuration}ms ease;
    pointer-events: none;
  }

  .title-bar-close-icon-searching {
    opacity: 1;
    transition: opacity ${animationDuration}ms ease;
    pointer-events: auto;
  }

  .title-bar-text-field {
    position: fixed;
    left: 100%;
    right: 70px;
    opacity: 0;

    background: none;
    border: none;
    box-sizing: border-box;
    -webkit-appearance: none;

    font-family: ${globalFontFamily.default};
    font-size: ${globalFontSizes.title};
  }

  .title-bar-text-field-closing {
    opacity: 0;
    left: 100%;
    right: 40px;
    transition: all ${animationDuration}ms ease;
  }

  .title-bar-text-field-searching {
    opacity: 1;
    left: 80px;
    transition: all ${animationDuration}ms ease;
  }

  .title-bar-text-field:focus,
  .title-bar-text-field:focus:focus,
  .title-bar-text-field-searching:focus {
    outline: none;
    border: none;
  }
`;

const TitleBarHeading = styled.h1`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.huge};
  font-weight: 700;
  color: ${globalColours.basic.licorice};

  margin: 0px;

  cursor: default;
`;

export const TitleBar = ({ title, hasSearchIcon=false }) => {
  let isSearching = false;

  const addSearchClass = () => {
    document.getElementById('titleBar').classList.add('title-bar-searching');
    document.getElementById('titleBarHeading').classList.add('title-bar-heading-searching');

    document.getElementById('titleBarTextField').classList.remove('title-bar-text-field-closing');
    document.getElementById('titleBarTextField').classList.add('title-bar-text-field-searching');

    document.getElementById('titleBarSearchIcon').classList.remove('title-bar-search-icon-closing');
    document.getElementById('titleBarSearchIcon').classList.add('title-bar-search-icon-searching');

    document.getElementById('titleBarCloseIcon').classList.remove('title-bar-close-icon-closing');
    document.getElementById('titleBarCloseIcon').classList.add('title-bar-close-icon-searching');

    document.getElementById('titleBarSearchQuery').classList.remove('title-bar-search-query-closing');
    document.getElementById('titleBarSearchQuery').classList.add('title-bar-search-query-searching');
  }

  const removeSearchClass = () => {
    document.getElementById('titleBar').classList.remove('title-bar-searching');
    document.getElementById('titleBarHeading').classList.remove('title-bar-heading-searching');

    document.getElementById('titleBarTextField').classList.remove('title-bar-text-field-searching');
    document.getElementById('titleBarTextField').classList.add('title-bar-text-field-closing');

    document.getElementById('titleBarSearchIcon').classList.remove('title-bar-search-icon-searching');
    document.getElementById('titleBarSearchIcon').classList.add('title-bar-search-icon-closing');

    document.getElementById('titleBarCloseIcon').classList.remove('title-bar-close-icon-searching');
    document.getElementById('titleBarCloseIcon').classList.add('title-bar-close-icon-closing');

    document.getElementById('titleBarSearchQuery').classList.remove('title-bar-search-query-searching');
    document.getElementById('titleBarSearchQuery').classList.add('title-bar-search-query-closing');

    window.setTimeout(() => {
      document.getElementById('titleBarTextField').classList.remove('title-bar-text-field-closing');
      document.getElementById('titleBarSearchIcon').classList.remove('title-bar-search-icon-closing');
    }, animationDuration);
  }

  const toggleSearch = () => {
    isSearching = !isSearching;

    if (isSearching) {
      addSearchClass();
      document.getElementById('titleBarTextField').focus();
    } else {
      removeSearchClass();
    }
  }

  const closeSearch = () => {
    isSearching = !isSearching;
    removeSearchClass();
  }

  const header = (
    <TitleBarHeading id="titleBarHeading" className="title-bar-heading">{title}</TitleBarHeading>
  );

  const headerWithSearch = (
    <div className="title-bar-search-container">
      <div className="title-bar-search-header">
        <TitleBarHeading id="titleBarHeading" className="title-bar-heading">{title}</TitleBarHeading>
        <input id="titleBarTextField" className="title-bar-text-field" placeholder={`Search ${title.toLowerCase()}...`}/>
        <img id="titleBarCloseIcon" className="title-bar-close-icon" src="/assets/icons/close.svg" alt="close" onClick={() => closeSearch()}/>
        <img id="titleBarSearchIcon" className="title-bar-search-icon" src="/assets/icons/search.svg" alt="search" onClick={() => toggleSearch()}/>
      </div>
      <div id="titleBarSearchQuery" className="title-bar-search-query">
        <UI.SegmentedControl options={["Name", "Tag", "Organiser"]} startIndex={0}/>
      </div>
    </div>
  );

  return (
    <>
      <style type="text/css">{styles}</style>
      <div id="titleBar" className="title-bar">
        <div className="title-bar-content">
          <div className="title-bar-items">
            {hasSearchIcon ? headerWithSearch : header}
          </div>
        </div>
      </div>
    </>
  );
}