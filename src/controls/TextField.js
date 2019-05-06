import styled from 'styled-components';
import AppDefaults from '../AppDefaults';

const textFieldFontSize = AppDefaults.constants.font.sizes.normal;

const TextField = styled.input`
  border: 1px solid #848484;
  border-radius: 5px;
  padding: 0.8em;

  // Prevents custom iOS styling
  -webkit-appearance: none;

  font-size: ${textFieldFontSize};
`;

export { TextField };