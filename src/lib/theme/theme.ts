import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "hsla(200, 75%, 89%, 0.913)",
    },
    warning: {
      main: "#f7b0b0",
    },
  },
  typography: {
    fontFamily: "Comfortaa",
  },
});

export default theme;
