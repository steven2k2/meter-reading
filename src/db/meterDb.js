/**
 * IndexedDB Module for Meter Data
 *
 * This module handles the database connection, initialization, and retrieval of meter data.
 */
import { openDB } from 'idb'
import meterData from './meterData.js'

const DB_NAME = 'metersDB'
const STORE_NAME = 'meters'

/**
 * Initializes the IndexedDB and populates it if empty.
 */
export const initializeDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade (db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
  })

  const count = await db.count(STORE_NAME)
  if (count === 0) {
    console.log('Populating database with initial meter data...')
    for (const meter of meterData) {
      await db.add(STORE_NAME, meter)
    }
    console.log('Database populated.')
  }
}

/**
 * Retrieves all meters from IndexedDB.
 * @returns {Promise<Array>} The list of all meters.
 */
export const getAllMeters = async () => {
  const db = await openDB(DB_NAME, 1)
  const meters = await db.getAll(STORE_NAME)
  console.log('Retrieved meters from DB:', meters)
  return meters
}

/**
 * Moves to the first meter.
 */
export const moveFirst = async () => {
  const meters = await getAllMeters()
  return meters.length > 0 ? meters[0] : null
}

/**
 * Moves to the last meter.
 */
export const moveLast = async () => {
  const meters = await getAllMeters()
  return meters.length > 0 ? meters[meters.length - 1] : null
}

/**
 * Moves to the next meter based on the current ID.
 * @param {number} currentId - The current meter ID.
 */
export const moveNext = async (currentId) => {
  const meters = await getAllMeters()
  const index = meters.findIndex(meter => meter.id === currentId)
  return index !== -1 && index < meters.length - 1 ? meters[index + 1] : null
}

/**
 * Moves to the previous meter based on current ID.
 * @param {number} currentId - The current meter ID.
 */
export const movePrevious = async (currentId) => {
  const meters = await getAllMeters()
  const index = meters.findIndex(meter => meter.id === currentId)
  return index > 0 ? meters[index - 1] : null
}

/**
 * Updates a meter's new_reading, meter_reader_note, and meter_reader_note_2.
 * @param {number} id - The meter ID.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<void>}
 */
export const updateMeter = async (meterId, updates) => {
  const db = await openDB(DB_NAME, 1)
  console.log(`🔹 Attempting to update meter with meter_id: ${meterId}`)

  // Find the correct meter
  const meters = await db.getAll(STORE_NAME)
  const meterIndex = meters.findIndex(m => m.meter_id === meterId)

  if (meterIndex !== -1) {
    const updatedMeter = { ...meters[meterIndex], ...updates }

    console.debug('✅ Updating meter:', updatedMeter)
    await db.put(STORE_NAME, updatedMeter)
    console.log(`✅ ${meterId} updated successfully.`)
  } else {
    alert(`❌ Meter not found for meter_id: ${meterId}`)
  }
}
