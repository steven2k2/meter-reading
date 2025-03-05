/**
 * MeterView Component
 *
 * Displays and allows editing of a meter object, including address, meter name, and last update time.
 * Users can modify values and save or cancel changes.
 *
 * Props:
 * @param {Object} meter - The meter object containing details.
 * @param {Function} onClose - Function to close the meter view.
 * @param {Function} onSave - Function to save meter data (passed from App).
 *
 * @returns {JSX.Element} A form to display and edit meter details.
 */
import React, { useContext, useState, useEffect } from 'react'
import { MeterContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { formatAddress } from '../utils/formatMeter.js'
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Paper,
  Divider,
  Grid
} from '@mui/material'
import { ArrowBack, Menu as MenuIcon, Done as DoneIcon, NavigateBefore, NavigateNext } from '@mui/icons-material'

function MeterView ({ meter, onClose, onSave }) {
  const { meters, currentMeterIndex, handleNextMeter, handlePreviousMeter } = useContext(MeterContext)
  const navigate = useNavigate()
  const [updatedMeter, setUpdatedMeter] = useState(meter)

  // Reset state when a new meter is selected
  useEffect(() => {
    setUpdatedMeter(meter)
  }, [meter])

  // Disable navigation buttons at boundaries
  const isFirstMeter = currentMeterIndex === 0
  const isLastMeter = currentMeterIndex === meters.length - 1

  const handleBack = () => {
    if (updatedMeter.new_reading !== meter.new_reading) {
      const confirmExit = window.confirm('You have unsaved changes. Discard them?')
      if (!confirmExit) return
    }
    navigate(-1)
  }

  // Handle form changes - use state to track updates
  const [warning, setWarning] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    const numValue = Number(value) || 0

    // Validate if new_reading exceeds the number of dials
    if (name === 'new_reading' && meter.dials && numValue.toString().length > meter.dials) {
      setWarning(`⚠️ The reading has more digits than the expected ${meter.dials} dials.`)
    } else {
      setWarning('') // Reset warning
    }

    setUpdatedMeter((prev) => ({ ...prev, [name]: numValue }))
    console.debug('Updated Meter Data:', updatedMeter)
  }

  // Handle Save button click
  const handleSave = () => {
    console.debug('Saving Meter Data:', updatedMeter)
    if (onSave) {
      onSave(updatedMeter)
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar with Back Button */}
      <AppBar position='static' sx={{ borderBottom: '2px solid black', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant='h6'>Meters</Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth='sm' sx={{ mt: 4, flexGrow: 1 }}>
        <TextField
          label='Reading'
          fullWidth
          variant='outlined'
          name='new_reading'
          type='number'
          value={updatedMeter.new_reading ?? ''}
          onChange={handleChange}
          sx={{
            mt: 2,
            bgcolor: '#fff',
            input: { fontSize: '2rem', textAlign: 'center' }
          }}
        />
        {warning && (
          <Typography sx={{ color: 'orange', fontSize: '0.9rem', mt: 1 }}>
            {warning}
          </Typography>
        )}

        <Paper elevation={0} sx={{ p: 2, mt: 2 }}>
          <Typography noWrap variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
            {formatAddress(updatedMeter)}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Meter Id:</strong> {updatedMeter.meter_id}</Typography>
              <Typography><strong>Status:</strong> {updatedMeter.status}</Typography>
              <Typography><strong>Previous:</strong> {updatedMeter.previous_reading}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Connection Id:</strong> {updatedMeter.connection_id}</Typography>
              <Typography><strong>Type:</strong> {updatedMeter.type}</Typography>
              <Typography><strong>Dials:</strong> {updatedMeter.dials}</Typography>
            </Grid>
          </Grid>
          <Divider />
        </Paper>
      </Container>

      {/* Bottom Toolbar with Menu, Navigation, and Done Button */}
      <AppBar position='fixed' sx={{ top: 'auto', bottom: 0, boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton edge='start' color='inherit' onClick={() => console.log('Menu Clicked')}>
            <MenuIcon />
          </IconButton>
          <Box>
            <IconButton color='inherit' onClick={handlePreviousMeter} disabled={isFirstMeter}>
              <NavigateBefore />
            </IconButton>
            <IconButton color='inherit' onClick={handleNextMeter} disabled={isLastMeter}>
              <NavigateNext />
            </IconButton>
          </Box>
          <Button variant='contained' color='primary' startIcon={<DoneIcon />} onClick={handleSave}>
            Done
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MeterView
