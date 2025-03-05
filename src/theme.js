import { createTheme } from '@mui/material/styles/index.js' // ✅ Explicit .js

const CITRINE = '#E6C60B' // Gold Yellow
const DAVYS_GRAY = '#4E4D4B' // Dark Gray
const BABY_POWDER = '#F9FAF7' // Light Grayish White
const ALABASTER = '#E1DFD2' // Soft Beige/Off-White
const SCHOOL_BUS_YELLOW = '#FCDD01' // Bright Yellow
const EERIE_BLACK = '#242320' // Almost Black

const theme = createTheme({
  palette: {
    primary: {
      main: SCHOOL_BUS_YELLOW, // 🎨 Bright Yellow
      contrastText: EERIE_BLACK // Dark Text for contrast
    },
    secondary: {
      main: CITRINE, // 🎨 Gold Yellow
      contrastText: DAVYS_GRAY // Dark Gray Text
    },
    background: {
      default: BABY_POWDER, // 🎨 Light Grayish White
      paper: ALABASTER // 🎨 Soft Off-White for Paper Elements
    },
    text: {
      primary: DAVYS_GRAY, // 🎨 Dark Gray
      secondary: EERIE_BLACK // 🎨 Almost Black for Contrast
    },
    action: {
      hover: CITRINE // 🎨 Gold Yellow Hover Effect
    }
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    body1: { fontWeight: 400, color: '#252321' },
    body2: { fontWeight: 300, color: '#141311' }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          backgroundColor: '#FEDE00', // ✅ Primary Yellow
          color: '#141311', // ✅ Dark Text
          '&:hover': {
            backgroundColor: '#E6C60B' // ✅ Gold on hover
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: '#E6C60B', // ✅ Gold for Paper elements
          // padding: '16px',
          // borderRadius: '8px',
          color: '#141311'
        }
      }
    }
  }
})

export default theme
