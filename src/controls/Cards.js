import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalFontFamily = Globals.constants.styles.font.family;
const globalBorderProps = Globals.constants.styles.border;

const styles = css`
  .card,
  .role-card,
  .event-card {
    display: flex;
    flex-direction: column;
    border-radius: ${globalBorderProps.radius};
    background: #F3F3F7;
    box-shadow: 0 5px 45px 0 rgba(0,0,0,0.25);
  }

  .event-card {
    height: 100%;
  }

  .card > *,
  .role-card > *,
  .event-card > * {
    margin: 0px;
  }

  .event-card-content {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-items: stretch;
    align-content: flex-end;
  }

  .card-image,
  .role-card-image {
    display: block;
    height: 118px;
    width: 100%;
    border-radius: ${globalBorderProps.radius} ${globalBorderProps.radius} 0 0;
    object-fit: cover;
  }

  .event-card-image {
    flex: 1;
    width: 100%;
    border-radius: ${globalBorderProps.radius} ${globalBorderProps.radius} 0 0;
    object-fit: cover;
  }

  .card-description,
  .role-card-description {
    padding: 15px;
  }

  .event-card-description {
    margin: 20px;
  }

  .card-description > *,
  .role-card-description > * {
    margin-top: 0px;
    margin-bottom: 5px;
  }

  .event-card-description > * {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .card-description > *:last-child,
  .role-card-description > *:last-child,
  .event-card-description > *:last-child {
    margin-bottom: 0px;
  }
`;

const RoleLabel = styled.h3`
  font-family: ${globalFontFamily.default};
  font-size: 18px;
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

const RoleDescription = styled.p`
  font-family: ${globalFontFamily.default};
  font-size: 14px;

  color: #9492A0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const RoleCard = ({ label, description, image, alt=label, onClick }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="role-card" onClick={onClick}>
        <div className="role-card-image-container">
          <img className="role-card-image" src={image} alt={alt}/>
        </div>
        <div className="role-card-description">
          <RoleLabel>{label}</RoleLabel>
          <RoleDescription>{description}</RoleDescription>
        </div>
      </div>
    </>
  );
};

const EventName = styled.h3`
  font-family: ${globalFontFamily.default};
  font-size: 22px;
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

const EventOrganisation = styled.p`
  font-family: ${globalFontFamily.default};
  font-size: 20px;
  font-variant: small-caps;

  color: #9492A0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const EventCard = ({ name, organisation, image, alt=name, onClick }) => {
  return (
    <>
      <style type="text/css">{styles}</style>
      <div className="event-card" onClick={onClick}>
        <div className="event-card-content">
          <img className="event-card-image" src={image} alt={alt}/>
          <div className="event-card-description">
            <EventName>{name}</EventName>
            <EventOrganisation>{organisation.toLowerCase()}</EventOrganisation>
          </div>
        </div>
      </div>
    </>
  );
}