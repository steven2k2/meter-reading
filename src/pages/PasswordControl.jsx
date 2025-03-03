import React, { useState, useEffect, useMemo } from 'react'
import {
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  AppBar,
  Toolbar,
  Button,
  useTheme
} from '@mui/material'
import { Visibility, VisibilityOff, Menu as MenuIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AssemblyInfo from '../js/AssemblyInfo.js'
import Settings from '../config/Settings.js'

// ✅ Import background images
import defaultBackground from '../assets/background.png'
import waterBackground from '../assets/WaterMeter.png'
import powerBackground from '../assets/ElectricityMeter_480x640.png'

const appInfo = new AssemblyInfo()

const PasswordControl = () => {
  const theme = useTheme()
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const navigate = useNavigate()

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
      case 'WT': return waterBackground
      case 'PB': return powerBackground
      default: return defaultBackground
    }
  }, [Settings.utilityType])

  /** ✅ Automatically submit password when correct */
  useEffect(() => {
    if (password === 'm3t3r') {
      setLoading(true)
      setTimeout(() => navigate('/dashboard'), 1000)
    }
  }, [password, navigate])

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
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: theme.typography.fontFamily
      }}
    >
      {/* ✅ Title Bar (Primary Color with White Text) */}
      <AppBar position='static' sx={{ bgcolor: theme.palette.primary.main, color: theme.palette.common.white }}>
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
      <AppBar
        position='static'
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          borderBottom: `2px solid ${theme.palette.text.primary}`,
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'flex-start', gap: 1.5 }}> {/* Reduced spacing */}
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Password
          </Typography>

          {/* ✅ Password Input Field (Left-aligned) */}
          <TextField
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoFocus
            variant='outlined'
            sx={{
              bgcolor: theme.palette.background.paper,
              minWidth: '220px' // ✅ Slightly reduced width for better alignment
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setPasswordVisible(!passwordVisible)} disabled={loading}>
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Toolbar>
      </AppBar>

      {/* ✅ Caps Lock Warning */}
      {capsLockOn && (
        <Typography variant='body2' sx={{ mt: 1, color: theme.palette.error.main, fontWeight: 'bold', ml: 2 }}>
          Caps Lock is ON
        </Typography>
      )}

      {/* ✅ Loading Indicator */}
      {loading && (
        <Box sx={{ mt: 2, ml: 2 }}>
          <Typography variant='h6' sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
            Logging in...
          </Typography>
          <CircularProgress color='primary' sx={{ mt: 1 }} />
        </Box>
      )}

      {/* ✅ Info Box */}
      <Container
        maxWidth='xs'
        sx={{ mt: 3, ml: 2, color: theme.palette.text.primary }}
      >
        <Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
          Version: {appInfo.version}
        </Typography>
        <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
          Copyright © 2002 - 2025 DSKY Ltd.
        </Typography>
        <Typography variant='h6' sx={{ mt: 1, fontWeight: 'bold' }}>
          {Settings.companyName}
        </Typography>

        {/* ✅ Large Bold Date Display */}
        <Typography
          variant='h3'
          sx={{
            fontWeight: 'bold',
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
