const assert = require('assert')
const { Meters } = require('../../src/utils/String.js')

describe('Meters.String.addBreaks()', function () {
  it('should return an empty string if input is empty', function () {
    assert.strictEqual(Meters.String.addBreaks('', 10), '')
  })

  it('should not modify a string that is already within the length limit', function () {
    assert.strictEqual(Meters.String.addBreaks('Short text', 20), 'Short text')
  })

  it('should remove unnecessary spaces and wrap text correctly', function () {
    assert.strictEqual(
      Meters.String.addBreaks('This is    a test     with  irregular spacing.', 10),
      'This is a\ntest with\nirregular\nspacing.'
    )
  })

  it('should insert line breaks at spaces when exceeding the length', function () {
    assert.strictEqual(
      Meters.String.addBreaks('This is a long sentence that should be wrapped properly.', 15),
      'This is a long\nsentence that\nshould be\nwrapped\nproperly.'
    )
  })
})
