import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
  Button,
  useTheme
} from '@mui/material'
import { Visibility, VisibilityOff, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AssemblyInfo from '../js/AssemblyInfo.js'
import Settings from '../utils/Settings.js'

// ✅ Import background images
import defaultBackground from '../assets/magnifying-glass.png'
import waterBackground from '../assets/water-meter.png'
import gasBackground from '../assets/gas-meter.png'
import powerBackground from '../assets/electricity-meter.png'

const appInfo = new AssemblyInfo()

const PasswordControl = ({ onLoginSuccess }) => {
  const theme = useTheme()
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === 'm3t3r') {
      setLoading(true)
      setTimeout(() => {
        // setLoading(false);
        onLoginSuccess() // Trigger App to navigate to /books
      }, 1000)
    } else {
      alert('Incorrect password. Try again.')
    }
  }

  /** ✅ Displayed Date (Memoized for Performance) */
  const displayedDate = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short'
    }).toUpperCase()
  }, [])

  /** ✅ Optimized Background Selection */
  const background = useMemo(() => {
    switch (Settings.utilityType) {
      case 'WTR': return waterBackground
      case 'GAS': return gasBackground
      case 'ELC': return powerBackground
      default: return defaultBackground
    }
  }, [Settings.utilityType])

  /** ✅ Detect Caps Lock */
  const handleKeyDown = (e) => setCapsLockOn(e.getModifierState('CapsLock'))

  /** ✅ Handle "OK" Button in the AppBar (Windows Mobile Close) */
  const handleAppClose = () => window.close()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${background})`, // ✅ Use your background variable
        backgroundSize: '256px', // ✅ Small fixed size
        backgroundPosition: 'center', // ✅ Centered in the viewport
        backgroundRepeat: 'no-repeat', // ✅ Prevent tiling
        backgroundColor: theme.palette.background.default // ✅ Adds a fallback color
      }}
    >
      {/* ✅ Title Bar (Primary Color with White Text) */}
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            {appInfo.title}
          </Typography>
          <Button color='inherit' onClick={handleAppClose}>OK</Button>
        </Toolbar>
      </AppBar>

      {/* ✅ Password Toolbar (Left-aligned Input Field) */}
      <AppBar position='static' sx={{ bgcolor: theme.palette.secondary.main, boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'flex-start', gap: 2 }}>
          <Typography variant='h6'>Password</Typography>
          <TextField
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            variant='outlined'
            sx={{ bgcolor: theme.palette.background.paper, minWidth: '220px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button variant='contained' color='primary' onClick={handleLogin} disabled={loading}>
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>

      {/* ✅ Caps Lock Warning */}
      {capsLockOn && (
        <Typography variant='body2' sx={{ mt: 1, color: theme.palette.error.main, fontWeight: 'bold', ml: 2 }}>
          Caps Lock is ON
        </Typography>
      )}

      {/* ✅ Info Box */}
      <Container
        maxWidth='xs'
        sx={{ mt: 3, ml: 2, color: theme.palette.text.primary }}
      >
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          Version: {appInfo.version}
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          Copyright © 2002 - 2025 DSKY Ltd.
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 1 }}>
          {Settings.companyName}
        </Typography>

        {/* ✅ Large Bold Date Display */}
        <Typography
          variant='h1'
          sx={{
            mt: 2
          }}
        >
          {displayedDate}
        </Typography>
      </Container>
    </Box>
  )
}

export default PasswordControl
