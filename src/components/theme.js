import { createMuiTheme } from "@material-ui/core";

const themeOptions = {
  typography: {
    fontFamily: `'VT323', monospace`,
  },
  palette: {
    textColor: "#4AF626",
    secondaryTextColor: "#FFFFFF",
  },
};

export const theme = createMuiTheme(themeOptions);
