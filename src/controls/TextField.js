import styled from 'styled-components';
import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

export const TextField = styled.input`
  background: none;
  border: ${globalBorderProps.size} solid ${globalColours.grey.contrast};
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;

  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};

  &:focus {
    outline: none;
    border: ${globalBorderProps.size} solid ${globalColours.purple.vibrant};
  }
`;

export const TextArea = styled.textarea`
  background: none;
  border: ${globalBorderProps.size} solid ${globalColours.grey.contrast};
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;

  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};

  resize: vertical;

  &:focus {
    outline: none;
    border: ${globalBorderProps.size} solid ${globalColours.purple.vibrant};
  }
`;