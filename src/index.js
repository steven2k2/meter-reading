import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles/index.js' // ✅ Explicit .js
import CssBaseline from '@mui/material/CssBaseline/index.js' // ✅ Explicit .js
import theme from './theme.js' // ✅ Ensure theme.js exists
import App from './App.jsx' // ✅ Explicit .jsx

// ✅ Mount the React app with correct providers
const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
