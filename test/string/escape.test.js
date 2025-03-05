/**
 * @file escape.test.js
 * @module escape.test
 * @description Unit tests for the `escape` function in the `Meters.String` utility module.
 *
 * Ensures proper escaping of single quotes and backslashes.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Meters } from '../../src/utils/String.js'

describe('Meters.String.escape()', function () {
  it('should not modify a string without special characters', function () {
    expect(Meters.String.escape('hello')).to.equal('hello')
  })

  it('should escape single quotes', function () {
    expect(Meters.String.escape("it's a test")).to.equal("it\\'s a test")
  })

  it('should escape backslashes', function () {
    expect(Meters.String.escape('C:\\Users\\name')).to.equal('C:\\\\Users\\\\name')
  })

  it('should escape both single quotes and backslashes', function () {
    expect(Meters.String.escape("John's \\ path")).to.equal("John\\'s \\\\ path")
  })

  it('should escape multiple single quotes', function () {
    expect(Meters.String.escape("''")).to.equal("\\'\\'")
  })

  it('should escape multiple backslashes', function () {
    expect(Meters.String.escape('\\\\')).to.equal('\\\\\\\\')
  })

  it('should return an empty string if input is empty', function () {
    expect(Meters.String.escape('')).to.equal('')
  })

  it('should not modify a string that does not require escaping', function () {
    expect(Meters.String.escape('NoEscapeNeeded')).to.equal('NoEscapeNeeded')
  })
})
