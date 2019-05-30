import React from 'react';
import styled, { css } from 'styled-components';
import Globals from '../Globals';

const globalColours = Globals.constants.styles.colours;
const globalFontFamily = Globals.constants.styles.font.family;
const globalFontSizes = Globals.constants.styles.font.sizes;
const globalBorderProps = Globals.constants.styles.border;

const BtnClr = Object.freeze({
  default: {
    normal: {
      text: globalColours.purple.vibrant,
      background: 'none',
      border: globalColours.purple.dark
    },
    disabled: {
      text: globalColours.purple.mute.vibrant,
      background: 'none',
      border: globalColours.purple.mute.dark
    }
  },

  primary: {
    normal: {
      text: globalColours.basic.pure,
      background: `linear-gradient(315deg, ${globalColours.purple.light} 0%, ${globalColours.purple.dark} 100%)`,
      // background: globalColours.purple.light,
      border: 'none'
    },
    disabled: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.purple.mute.light} 0%, ${globalColours.purple.mute.dark} 100%)`,
      // background: globalColours.purple.light,
      border: 'none'
    }
  },

  danger: {
    normal: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.red.light} 0%, ${globalColours.red.dark} 100%)`,
      // background: globalColours.red.light,
      border: 'none'
    },
    disabled: {
      text: globalColours.basic.pure,
      background: `linear-gradient(3151deg, ${globalColours.red.mute.light} 0%, ${globalColours.red.mute.dark} 100%)`,
      // background: globalColours.red.light,
      border: 'none'
    }
  },

  hint: {
    normal: {
      text: globalColours.purple.vibrant,
      background: 'none',
      border: 'none'
    },
    disabled: {
      text: globalColours.purple.mute.vibrant,
      background: 'none',
      border: 'none'
    }
  }
});

export const Button = styled.button`
  background: ${BtnClr.default.normal.background};
  color: ${BtnClr.default.normal.text};

  border: ${globalBorderProps.size} solid ${BtnClr.default.normal.border};
  border-radius: ${globalBorderProps.radius};
  box-sizing: border-box;
  box-shadow: none;

  flex-grow: 1;
  padding: 0.8em 1.2em;
  height: 50px;

  font-family: ${globalFontFamily.default};
  font-size: ${globalFontSizes.normal};
  text-align: center;
  font-weight: 500;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;

  &:disabled {
    background: ${BtnClr.default.disabled.background};
    color: ${BtnClr.default.disabled.text};

    border: ${globalBorderProps.size} solid ${BtnClr.default.disabled.border};
    box-shadow: none;
  }

  ${props => props.primary && css`
    background: ${BtnClr.primary.normal.background};
    color: ${BtnClr.primary.normal.text};

    border: none;
    box-shadow: 0 15px 45px 0 rgba(150,85,208,0.25);

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.primary.disabled.background};
      color: ${BtnClr.primary.disabled.text};

      border: none;
      box-shadow: 0 0px 0px 0 rgba(150,85,208,0.25);
    }
  `}

  ${props => props.danger && css`
    background: ${BtnClr.danger.normal.background};
    color: ${BtnClr.danger.normal.text};

    border: none;
    box-shadow: 0 15px 45px 0 rgba(236,98,100,0.25);

    font-weight: 500;

    &:disabled {
      background: ${BtnClr.danger.disabled.background};
      color: ${BtnClr.danger.disabled.text};

      border: none;
      box-shadow: 0 0px 0px 0 rgba(236,98,100,0.25);
    }
  `}

  ${props => props.hint && css`
    background: ${BtnClr.hint.normal.background};
    color: ${BtnClr.hint.normal.text};

    border: ${BtnClr.hint.normal.border};

    font-size: ${globalFontSizes.small};
    font-weight: 500;

    padding: 0px;
    height: auto;

    &:disabled {
      background: ${BtnClr.hint.disabled.background};
      border: ${BtnClr.hint.disabled.border};
      color: ${BtnClr.hint.disabled.text};
    }
  `}
`;

export const BackButton = ({ to, from }) => {
  return <img className="back-button" src="/assets/icons/back_button.svg" alt="back button" onClick={() => from.props.history.push(to)}/>;
};

// const segmentedButtonStyles = css`
//   .segmented-button {
//     display: flex;
//     justify-content: stretch;
//   }

//   .segmented-button > * {
//     height: 35px;
//     margin: 0;
//     padding: 0;
//     flex: 1;

//     font-size: ${globalFontSizes.small};

//     transition: none;
//   }

//   .segmented-button-first {
//     border-radius: 5px 0 0 5px;
//     height: 35px;
//   }

//   .segmented-button-second {
//     border-radius: 0 5px 5px 0;
//   }

//   .segmented-button-selected {
//     background: ${BtnClr.primary.normal.background};
//     color: ${BtnClr.primary.normal.text};
//     border: 0px;
//   }
// `;

// export const SegmentedButton = ({ first, second }) => {
//   const setCurrentIndex = (index=0) => {
//     if (index === 0) {
//       document.getElementById('segmentedButtonFirst').classList.add('segmented-button-selected');
//       document.getElementById('segmentedButtonSecond').classList.remove('segmented-button-selected');
//     } else {
//       document.getElementById('segmentedButtonFirst').classList.remove('segmented-button-selected');
//       document.getElementById('segmentedButtonSecond').classList.add('segmented-button-selected');
//     }
//   }

//   return (
//     <>
//       <style type="text/css">{segmentedButtonStyles}</style>
//       <div className="segmented-button">
//         <Button id="segmentedButtonFirst" className="segmented-button-first segmented-button-selected" onClick={() => setCurrentIndex(0)}>{first}</Button>
//         <Button id="segmentedButtonSecond" className="segmented-button-second" onClick={() => setCurrentIndex(1)}>{second}</Button>
//       </div>
//     </>
//   );
// }

const segmentedControlStyles = css`
  .segmented-control {
    display: flex;
    flex-flow: row-wrap;
    box-sizing: border-box;

    font-family: ${globalFontFamily.default};
    font-size: ${globalFontSizes.small};
    text-align: center;
  }

  .segmented-control label {
    display: block;
    flex: 1;
    box-sizing: border-box;

    background: ${BtnClr.default.normal.background};
    color: ${BtnClr.default.normal.text};

    border: ${globalBorderProps.size} solid ${BtnClr.default.normal.border};
    border-right: none;

    margin: 0;
    padding: 0.6em 1.2em;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .segmented-control label.selected {
    background: ${globalColours.purple.dark};
    color: ${BtnClr.primary.normal.text};
  }

  .segmented-control label:first-child {
    border-radius: ${globalBorderProps.radius} 0 0 ${globalBorderProps.radius};
    border-right: 0;
  }

  .segmented-control label:last-child {
    border-radius: 0 ${globalBorderProps.radius} ${globalBorderProps.radius} 0;
    border-right: ${globalBorderProps.size} solid ${BtnClr.default.normal.border};
  }

  .segmented-control input[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    position: absolute;
  }
`;

export const SegmentedControl = ({ options=[], startIndex=0 }) => {
  const toggleSegmentControls = () => {
    const controls = document.getElementById('segmentedControl').getElementsByTagName('label');

    Array.from(controls).forEach((control) => {
      if (control.getElementsByTagName('input')[0].checked) {
        control.classList.add('selected');
      } else {
        control.classList.remove('selected');
      }
    });
  }

  return (
    <>
    <style type="text/css">{segmentedControlStyles}</style>
    <div id="segmentedControl" className="segmented-control">
      {options.map((option, index) => {
        return (
          <label className={index === startIndex ? "selected" : null} key={`${index}-${new Date().getTime()}`}>
            <input type="radio" name="segmented-control" checked={index === startIndex ? "checked" : null} onChange={() => toggleSegmentControls()}/>{option}
          </label>
        );
      })}
    </div>
    </>
  );
}