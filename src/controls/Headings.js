import styled from 'styled-components';
import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;

export const Title = styled.h1`
  color: ${globalColours.purple.vibrant};

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.title};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: default;
`;

export const Caption = styled.h1`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.caption};
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: default;
`;

export const Heading = styled.h2`
  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.heading};
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: default;
`;

export const Subheading = styled.h2`
  color: ${globalColours.grey.contrast};

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.subheading};
  font-weight: 400;

  margin-top: 0px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: default;
`;

export const Label = styled.label`
  color: ${globalColours.grey.contrast};

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
  font-weight: 500;
  font-variant: small-caps;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  cursor: default;
`;