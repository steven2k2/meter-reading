import { createTheme } from "@mui/material/styles/index.js"; // ✅ Explicit .js

const theme = createTheme({
  palette: {
    primary: {
      main: "#00BCD4", // Cyan (Title Bar)
    },
    secondary: {
      main: "#FF9800", // Orange (Password Bar & Highlights)
    },
    background: {
      default: "#F5F5F5", // Light Gray (Background)
    },
    text: {
      primary: "#000000", // Black Text
      secondary: "#4F4F4F", // Dark Gray
    },
  },
  typography: {
    fontFamily: "Tahoma, sans-serif",
    h6: {
      fontWeight: "bold",
    },
    body2: {
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Removes default shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: "4px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none", // Disable uppercase text
        },
      },
    },
  },
});

export default theme;