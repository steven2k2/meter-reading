import chai from 'chai'

const { expect } = chai

describe('Settings Module', function () {
  let settings

  before(async function () {
    settings = await import('../src/config/settings.js')
  })

  it('should return an object', function () {
    expect(settings.default).to.be.an('object')
  })

  it('should have a companyName property', function () {
    expect(settings.default).to.have.property('companyName').that.is.a('string')
  })

  it('should have a lowReadingCheck property', function () {
    expect(settings.default).to.have.property('lowReadingCheck').that.is.a('boolean')
  })

  it('should have a showEstimate property', function () {
    expect(settings.default).to.have.property('showEstimate').that.is.a('boolean')
  })

  it('should have a utilityType property', function () {
    expect(settings.default).to.have.property('utilityType').that.is.a('string')
  })
})
