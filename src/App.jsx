/**
 * App Component
 *
 * The main application entry point that sets up routing and navigation.
 */
import React, { useEffect, useState, createContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { getAllMeters, initializeDB, moveNext, movePrevious, updateMeter } from './db/meterDB'
import PasswordControl from './views/PasswordControl'
import Settings from './views/Settings.jsx'
import MeterView from './views/MeterView.jsx'
import BooksView from './views/BooksView.jsx'

// Create a context to share meters across the app
export const MeterContext = createContext()

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [meters, setMeters] = useState([])
  const [currentMeterIndex, setCurrentMeterIndex] = useState(0)

  // Log route changes
  useEffect(() => {
    console.log('Navigated to:', location.pathname)
  }, [location])

  // Initialize DB and fetch all meters
  useEffect(() => {
    const setupDB = async () => {
      console.log('Initializing database...')
      await initializeDB()
      console.log('Database initialized.')
      const metersList = await getAllMeters()
      if (metersList.length > 0) {
        console.log('Loaded meters:', metersList)
        setMeters(metersList)
      }
    }
    setupDB()
  }, [])

  // Navigation functions to step through meters
  const handleNextMeter = () => {
    console.log('Moving to next meter. Current index:', currentMeterIndex)
    setCurrentMeterIndex((prevIndex) => (prevIndex < meters.length - 1 ? prevIndex + 1 : prevIndex))
  }

  const handlePreviousMeter = () => {
    console.log('Moving to previous meter. Current index:', currentMeterIndex)
    setCurrentMeterIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  // Save meter reading and move to next record
  const handleSaveMeter = async (updatedMeter) => {
    console.debug('Saving meter:', updatedMeter)
    await updateMeter(updatedMeter.meter_id, updatedMeter)

    // Fetch updated meters to confirm changes
    const metersList = await getAllMeters()
    setMeters(metersList)

    console.debug('Meter saved. Moving to next meter...')
    handleNextMeter() // Move only AFTER saving
  }

  // Handle book selection
  const handleBookSelection = (bookId) => {
    setSelectedBookId(bookId)
    console.log('Selected Book ID:', bookId)
    navigate('/meter')
  }

  // Handle login success from PasswordControl
  const handleLoginSuccess = () => {
    navigate('/meter')
  }

  return (
    <MeterContext.Provider value={{ meters, currentMeterIndex, handleNextMeter, handlePreviousMeter }}>
      <Routes>
        <Route path='/' element={<PasswordControl onLoginSuccess={handleLoginSuccess} />} />
        <Route path='/meter' element={<MeterView meter={meters[currentMeterIndex] || { meter_id: 'No Data', location_address_1: 'Unknown' }} bookId={selectedBookId} onSave={handleSaveMeter} />} />
        <Route path='/books' element={<BooksView onClose={handleBookSelection} />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </MeterContext.Provider>
  )
}

export default App
