const assert = require('assert')
const { Meters } = require('../../src/utils/String.js')

describe('Meters.String.squash()', function () {
  it('should remove spaces and truncate using ellipsis if necessary', function () {
    assert.strictEqual(Meters.String.squash('Hello World', 5), 'Hell…')
  })

  it('should remove all spaces if required but not truncate if then within limit', function () {
    assert.strictEqual(Meters.String.squash('Long sentence', 12), 'Longsentence')
  })

  it('should truncate properly using ellipsis', function () {
    assert.strictEqual(Meters.String.squash('abcdefghijk', 8), 'abcdefg…')
  })

  it('should return an empty string if input is empty', function () {
    assert.strictEqual(Meters.String.squash('', 5), '')
  })

  it('should handle cases where length is greater than text length', function () {
    assert.strictEqual(Meters.String.squash('short', 10), 'short')
  })

  it('should handle text containing only spaces', function () {
    assert.strictEqual(Meters.String.squash('      ', 5), '')
  })

  it('should handle special characters correctly', function () {
    assert.strictEqual(Meters.String.squash('A B C D E', 5), 'ABCDE')
  })
})
