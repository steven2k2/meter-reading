/**
 * @file insert.test.js
 * @module insert.test
 * @description Unit tests for the `insert` function in the `Meters.String` utility module.
 *
 * Ensures correct substring insertion at specified positions.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Meters } from '../../src/utils/String.js'

describe('Meters.String.insert()', function () {
  it('should insert at a specific index', function () {
    expect(Meters.String.insert('abcdefg', 'h', 3)).to.equal('abchdefg')
  })

  it('should insert at the start when index is 0', function () {
    expect(Meters.String.insert('abcdefg', 'h', 0)).to.equal('habcdefg')
  })

  it('should append at the end if index is larger than the string length', function () {
    expect(Meters.String.insert('abcdefg', 'h', 10)).to.equal('abcdefgh')
  })

  it('should handle an empty string properly', function () {
    expect(Meters.String.insert('', 'h', 0)).to.equal('h')
  })

  it('should insert at the correct position when using negative indices', function () {
    expect(Meters.String.insert('abcdefg', 'h', -1)).to.equal('abcdefhg')
  })

  it('should insert at the start if negative index is out of bounds', function () {
    expect(Meters.String.insert('abcdefg', 'h', -10)).to.equal('habcdefg')
  })

  it('should insert at the end if index is excessively large', function () {
    expect(Meters.String.insert('abcdefg', 'h', 100)).to.equal('abcdefgh')
  })

  it('should insert a word at the end', function () {
    expect(Meters.String.insert('hello', ' world', 5)).to.equal('hello world')
  })

  it('should insert before the first character when negative index matches string length', function () {
    expect(Meters.String.insert('start', 'ing', -5)).to.equal('ingstart')
  })
})
