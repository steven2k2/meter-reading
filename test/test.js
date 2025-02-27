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

    describe('escape()', function () {
      it('should escape single quotes (\')', function () {
        assert.strictEqual(Meters.String.escape('It\'s a test'), 'It\\\'s a test')
      })

      it('should escape backslashes (\\)', function () {
        assert.strictEqual(Meters.String.escape('Path\\to\\file'), 'Path\\\\to\\\\file')
      })

      it('should escape both \' and \\', function () {
        assert.strictEqual(Meters.String.escape('Don\'t \\ stop'), 'Don\\\'t \\\\ stop')
      })

      it('should return the same string if no escaping is needed', function () {
        assert.strictEqual(Meters.String.escape('Hello, World!'), 'Hello, World!')
      })

      it('should handle an empty string', function () {
        assert.strictEqual(Meters.String.escape(''), '')
      })

      it('should handle strings with only escape characters', function () {
        assert.strictEqual(Meters.String.escape('\'\\\''), '\\\'\\\\\\\'')
      })
    })

    describe('insert()', function () {
      it('should insert a substring at a positive index', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', 2), 'abXcdefg')
      })

      it('should insert a substring at the start (index 0)', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', 0), 'Xabcdefg')
      })

      it('should insert a substring at the end (index >= length)', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', 7), 'abcdefgX')
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', 10), 'abcdefgX') // Beyond length
      })

      it('should insert a substring using a negative index (from end)', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', -2), 'abcdeXfg')
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', -1), 'abcdefXg')
      })

      it('should insert at the start if index is too negative', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', 'X', -10), 'Xabcdefg')
      })

      it('should handle inserting into an empty string', function () {
        assert.strictEqual(Meters.String.insert('', 'X', 0), 'X')
      })

      it('should return the value if original string is null or undefined', function () {
        assert.strictEqual(Meters.String.insert(null, 'X', 0), 'X')
        assert.strictEqual(Meters.String.insert(undefined, 'X', 0), 'X')
      })

      it('should return the original string if the value to insert is null or empty', function () {
        assert.strictEqual(Meters.String.insert('abcdefg', '', 2), 'abcdefg')
        assert.strictEqual(Meters.String.insert('abcdefg', null, 2), 'abcdefg')
        assert.strictEqual(Meters.String.insert('abcdefg', undefined, 2), 'abcdefg')
      })
    })

    describe('createVarName()', function () {
      it('should remove non-alphabetic leading characters', function () {
        assert.strictEqual(Meters.String.createVarName('123abc'), 'abc')
        assert.strictEqual(Meters.String.createVarName('_$testVar'), 'testVar')
        assert.strictEqual(Meters.String.createVarName('!@#varName'), 'varName')
      })

      it('should remove non-alphanumeric characters', function () {
        assert.strictEqual(Meters.String.createVarName('my-var'), 'myvar')
        assert.strictEqual(Meters.String.createVarName('hello world'), 'helloworld')
        assert.strictEqual(Meters.String.createVarName('some%weird$name'), 'someweirdname')
      })

      it('should allow alphabetic characters to remain', function () {
        assert.strictEqual(Meters.String.createVarName('simpleVar'), 'simpleVar')
        assert.strictEqual(Meters.String.createVarName('AnotherVar123'), 'AnotherVar123')
      })

      it('should return an empty string if no alphabetic characters exist', function () {
        assert.strictEqual(Meters.String.createVarName('1234'), '')
        assert.strictEqual(Meters.String.createVarName('!@#$%^&*()'), '')
      })

      it('should handle empty string input', function () {
        assert.strictEqual(Meters.String.createVarName(''), '')
      })

      it('should handle null or undefined input gracefully', function () {
        assert.strictEqual(Meters.String.createVarName(null), '')
        assert.strictEqual(Meters.String.createVarName(undefined), '')
      })
    })
  })
})
