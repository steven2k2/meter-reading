/**
 * @file addBreaks.test.js
 * @module addBreaks.test
 * @description Unit tests for the `addBreaks` function in the `Meters.String` utility module.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Meters } from '../../src/utils/String.js'

describe('Meters.String.addBreaks()', function () {
  it('should return an empty string if input is empty', function () {
    expect(Meters.String.addBreaks('', 10)).to.equal('')
  })

  it('should not modify a string that is already within the length limit', function () {
    expect(Meters.String.addBreaks('Short text', 20)).to.equal('Short text')
  })

  it('should remove unnecessary spaces and wrap text correctly', function () {
    expect(Meters.String.addBreaks('This is    a test     with  irregular spacing.', 10))
      .to.equal('This is a\ntest with\nirregular\nspacing.')
  })

  it('should insert line breaks at spaces when exceeding the length', function () {
    expect(Meters.String.addBreaks('This is a long sentence that should be wrapped properly.', 15))
      .to.equal('This is a long\nsentence that\nshould be\nwrapped\nproperly.')
  })
})
