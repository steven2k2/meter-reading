const assert = require('assert')
const { Meters } = require('../src/utils/String.js')

describe('MetersString utility', function () {
  describe('String functions', function () {
    it('should capitalise text', function () {
      assert.strictEqual(Meters.String.capitalize('hello'), 'Hello')
    })

    it('should handle empty string in capitalise', function () {
      assert.strictEqual(Meters.String.capitalize(''), '')
    })

    it('should handle single-letter strings in capitalise', function () {
      assert.strictEqual(Meters.String.capitalize('a'), 'A')
    })

    it('should not modify already capitalised text', function () {
      assert.strictEqual(Meters.String.capitalize('Hello'), 'Hello')
    })

    it('should uncapitalise text', function () {
      assert.strictEqual(Meters.String.uncapitalize('Hello'), 'hello')
    })

    it('should handle empty string in uncapitalise', function () {
      assert.strictEqual(Meters.String.uncapitalize(''), '')
    })

    it('should handle single-letter strings in uncapitalise', function () {
      assert.strictEqual(Meters.String.uncapitalize('A'), 'a')
    })

    it('should not modify already uncapitalised text', function () {
      assert.strictEqual(Meters.String.uncapitalize('hello'), 'hello')
    })

    describe('Ellipsis function', function () {
      it('should not truncate a string shorter than the length', function () {
        assert.strictEqual(Meters.String.ellipsis('Short text', 20), 'Short text')
      })

      it('should truncate a string longer than the length', function () {
        assert.strictEqual(Meters.String.ellipsis('This is a long text that should be truncated', 20), 'This is a long text…')
      })

      it('should truncate at the last word break when word=true', function () {
        assert.strictEqual(Meters.String.ellipsis('This is a long text that should be truncated properly', 20, true), 'This is a long…')
      })

      it('should truncate at punctuation when word=true', function () {
        assert.strictEqual(Meters.String.ellipsis('This is a test sentence. It should break at punctuation.', 20, true), 'This is a test…')
      })

      it('should return an empty string if input is empty', function () {
        assert.strictEqual(Meters.String.ellipsis('', 10), '')
      })

      it('should handle null values gracefully', function () {
        assert.strictEqual(Meters.String.ellipsis(null, 10), null)
      })

      it('should handle undefined values gracefully', function () {
        assert.strictEqual(Meters.String.ellipsis(undefined, 10), undefined)
      })
    })
  })
})
