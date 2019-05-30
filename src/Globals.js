const Globals = Object.freeze({
  app: {
    name: "Time Aid",
    caption: "Your time spent on good causes",
    version: "0.1.5"
  },
  constants: {
    criteria: {
      minUsernameLength: 1,
      minEmailLength: 3,
      minPasswordLength: 8
    },
    styles: {
      border: {
        size: "1.5px",
        radius: "6px"
      },
      colours: {
        purple: {
          vibrant: "#4B2AE8",
          dark: "#836FEA",
          light: "#9655D0",
          mute: {
            vibrant: "#7A68D9",
            dark: "#A593FF",
            light: "#BA7DF0"
          }
        },
        red: {
          dark: "#D05567",
          light: "#EC6264",
          mute: {
            dark: "#FF8496",
            light: "#F77577"
          }
        },
        yellow: {
          dark: "#E29258",
          light: "#FFB758"
        },
        green: {
          dark: "#207B18",
          light: "#65AA5F"
        },
        grey: {
          contrast: "#9492A0",
          dark: "#DEDEE3",
          light: "#F3F3F7"
        },
        basic: {
          licorice: "#1C1B1B",
          pure: "#FBFBFB"
        }
      },
      font: {
        family: {
          default: "'Rubik', sans-serif"
        },
        sizes: {
          small: "14px",
          normal: "16px",
          subheading: "20px",
          heading: "30px",
          caption: "30px",
          title: "22px",
          huge: "44px"
        }
      }
    }
  }
});

export default Globals;