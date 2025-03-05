import { expect } from 'chai'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import Settings from '../src/utils/Settings.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const testSettingsPath = path.join(__dirname, 'test-settings.json')

// Override settings path for testing
Settings.settingsPath = testSettingsPath

describe('Settings Class', function () {
  beforeEach(function () {
    // Ensure test file does not exist before each test
    if (fs.existsSync(testSettingsPath)) {
      fs.unlinkSync(testSettingsPath)
    }
    Settings.settings = {}
  })

  after(function () {
    // Cleanup test file after all tests
    if (fs.existsSync(testSettingsPath)) {
      fs.unlinkSync(testSettingsPath)
    }
  })

  it('should initialize with an empty settings object', function () {
    expect(Settings.settings).to.be.an('object').that.is.empty
  })

  it('should set and get a string property', function () {
    Settings.companyName = 'Test Company'
    expect(Settings.companyName).to.equal('Test Company')
  })

  it('should persist settings to a file', function () {
    Settings.utilityType = 'Electricity'
    Settings.saveSettings()

    expect(fs.existsSync(testSettingsPath)).to.be.true
    const savedData = JSON.parse(fs.readFileSync(testSettingsPath, 'utf8'))
    expect(savedData.UtilityType).to.equal('Electricity')
  })

  it('should load settings from file', function () {
    fs.writeFileSync(testSettingsPath, JSON.stringify({ CompanyName: 'Loaded Company' }), 'utf8')
    Settings.loadSettings()
    expect(Settings.companyName).to.equal('Loaded Company')
  })

  it('should return default values for missing properties', function () {
    expect(Settings.keyPadType).to.equal('')
    expect(Settings.lowReadingCheck).to.be.false
  })
})
