/**
 * @file Settings.js
 * @description A utility class for managing application settings using localStorage.
 * @module Settings
 */

class Settings {
  /**
   * Creates an instance of Settings and loads settings from localStorage.
   */
  constructor () {
    this.defaultSettings = {
      companyName: 'Watertown Shire',
      lowReadingCheck: true,
      showEstimate: true,
      utilityType: 'WTR'
    }
    this.settings = this.loadSettings()
  }

  /**
   * Loads settings from localStorage.
   * If no settings exist, initialise with default values.
   */
  loadSettings () {
    const savedSettings = localStorage.getItem('settings')
    return savedSettings ? JSON.parse(savedSettings) : this.defaultSettings
  }

  /**
   * Saves settings to localStorage.
   */
  saveSettings () {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  /**
   * Gets a property value from settings.
   * @param {string} key - The key of the setting.
   * @param {*} [defaultValue=''] - The default value if the key does not exist.
   * @returns {*} The value of the setting or the default value.
   */
  getProperty (key, defaultValue = '') {
    return this.settings[key] !== undefined ? this.settings[key] : defaultValue
  }

  /**
   * Sets a property value in settings.
   * @param {string} key - The key of the setting.
   * @param {*} value - The value to set.
   */
  setProperty (key, value) {
    this.settings[key] = value
    this.saveSettings()
  }

  /** @returns {string} */
  get utilityType () {
    return this.getProperty('utilityType', '')
  }

  /** @param {string} value */
  set utilityType (value) {
    this.setProperty('utilityType', value)
  }

  /** @returns {string} */
  get companyName () {
    return this.getProperty('companyName', '')
  }

  /** @param {string} value */
  set companyName (value) {
    this.setProperty('companyName', value)
  }

  /** @returns {boolean} */
  get lowReadingCheck () {
    return this.getProperty('lowReadingCheck', false)
  }

  /** @param {boolean} value */
  set lowReadingCheck (value) {
    this.setProperty('lowReadingCheck', value)
  }

  /** @returns {boolean} */
  get showEstimate () {
    return this.getProperty('showEstimate', false)
  }

  /** @param {boolean} value */
  set showEstimate (value) {
    this.setProperty('showEstimate', value)
  }
}

export default new Settings()
