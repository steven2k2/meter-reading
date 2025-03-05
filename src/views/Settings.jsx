/**
 * @file Settings.jsx
 * @module SettingsPage
 * @description A React page for testing and modifying application settings.
 *
 * @requires react
 * @requires @mui/material
 * @requires react-router-dom
 * @requires ../utils/Settings.js
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import Settings from '../utils/Settings.js'

const SettingsPage = () => {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState('')
  const [utilityType, setUtilityType] = useState('')
  const [lowReadingCheck, setLowReadingCheck] = useState(false)
  const [showEstimate, setShowEstimate] = useState(false)

  /** ✅ Load settings on mount */
  useEffect(() => {
    setCompanyName(Settings.companyName)
    setUtilityType(Settings.utilityType)
    setLowReadingCheck(Settings.lowReadingCheck)
    setShowEstimate(Settings.showEstimate)
  }, [])

  /** ✅ Update settings dynamically */
  const handleUpdate = (key, value) => {
    Settings[key] = value
    switch (key) {
      case 'companyName': setCompanyName(value); break
      case 'utilityType': setUtilityType(value); break
      case 'lowReadingCheck': setLowReadingCheck(value); break
      case 'showEstimate': setShowEstimate(value); break
      default: break
    }
  }

  /** ✅ Reset settings to defaults */
  const resetSettings = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ✅ AppBar with Back Button */}
      <AppBar
        position='static' sx={{
          // bgcolor: theme.palette.secondary.main,
          // color: theme.palette.secondary.contrastText,
          borderBottom: '2px solid black', // HACK
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6'>Settings</Typography>
        </Toolbar>
      </AppBar>

      {/* ✅ Main Content */}
      <Container maxWidth='sm' sx={{ mt: 4, flexGrow: 1 }}>
        <Typography variant='h4' sx={{ fontWeight: 'bold', mb: 2 }}>
          Settings
        </Typography>

        <TextField
          label='Company Name'
          variant='outlined'
          fullWidth
          value={companyName}
          onChange={(e) => handleUpdate('companyName', e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Utility Type</InputLabel>
          <Select
            value={utilityType}
            onChange={(e) => handleUpdate('utilityType', e.target.value)}
            label='Utility Type'
          >
            <MenuItem value='GAS'>Gas</MenuItem>
            <MenuItem value='ELC'>Electricity</MenuItem>
            <MenuItem value='WTR'>Water</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch checked={lowReadingCheck} onChange={(e) => handleUpdate('lowReadingCheck', e.target.checked)} />}
          label='Enable Low Reading Check'
        />

        <FormControlLabel
          control={<Switch checked={showEstimate} onChange={(e) => handleUpdate('showEstimate', e.target.checked)} />}
          label='Show Estimate'
        />

        <Box sx={{ mt: 3 }}>
          <Button variant='contained' color='error' onClick={resetSettings}>
            Reset to Defaults
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default SettingsPage
