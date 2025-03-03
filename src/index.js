import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // ✅ Fixed import
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js"; // ✅ Ensure theme.js is correctly set up
import App from "./App.jsx";

// ✅ Mount the React app with correct providers
const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);