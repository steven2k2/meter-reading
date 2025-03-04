/**
 * @file capitalize.test.mjs
 * @module capitalize.test
 * @description Unit tests for the `capitalize` function in the `Meters.String` utility module.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Meters } from '../../src/utils/String.js';

describe('Meters.String.capitalize()', function () {
  it('should capitalize the first letter of a lowercase word', function () {
    expect(Meters.String.capitalize('hello')).to.equal('Hello');
  });

  it('should not change an already capitalized word', function () {
    expect(Meters.String.capitalize('Hello')).to.equal('Hello');
  });

  it('should only capitalize the first letter', function () {
    expect(Meters.String.capitalize('hELLO')).to.equal('HELLO');
  });

  it('should not modify numbers at the start of a string', function () {
    expect(Meters.String.capitalize('123hello')).to.equal('123hello');
  });

  it('should return an empty string when given an empty string', function () {
    expect(Meters.String.capitalize('')).to.equal('');
  });

  it('should capitalize a single character string', function () {
    expect(Meters.String.capitalize('a')).to.equal('A');
  });

  it('should handle special characters like accented letters', function () {
    expect(Meters.String.capitalize('äbc')).to.equal('Äbc');
  });

  it('should only capitalize the first word in a sentence', function () {
    expect(Meters.String.capitalize('hello world')).to.equal('Hello world');
  });
});