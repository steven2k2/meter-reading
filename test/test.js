const assert = require('assert')
const { MetersString } = require('../src/utils/String.js')

describe('MetersString utility', function () {
  describe('String functions', function () {
    it('should capitalise text', function () {
      assert.strictEqual(MetersString.capitalize('hello'), 'Hello')
    })

    it('should handle empty string in capitalise', function () {
      assert.strictEqual(MetersString.capitalize(''), '')
    })

    it('should trim whitespace from a string', function () {
      assert.strictEqual(MetersString.trim('  hello  '), 'hello')
    })

    it('should return empty string when trimming a non-string', function () {
      assert.strictEqual(MetersString.trim(null), '')
    })
  })
})
