// theme.ts
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E9ECEF",
    },
    secondary: {
      main: "#DEE2E6",
    },
    info: {
      main: "#F5F7FA",
    },
    background: {
      default: "#f8f9fa",
    },
    text: {
      primary: "#212529",
      secondary: "#343A40",
    },
  },
});


export { lightTheme };