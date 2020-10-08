import { createMuiTheme } from "@material-ui/core";

const themeOptions = {
  typography: {
    fontFamily: `'VT323', monospace`,
    fontSize: 16,
  },
  palette: {
    primary: {
      light: "#4cafae",
      main: "#007f7f",
      dark: "#005253",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffe76c",
      main: "#cfb53b",
      dark: "#9b8600",
      contrastText: "#000",
    },
  },
};

export const theme = createMuiTheme(themeOptions);
