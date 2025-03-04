/**
 * @file uncapitalize.test.js
 * @module uncapitalize.test
 * @description Unit tests for the `uncapitalize` function in the `Meters.String` utility module.
 *
 * Ensures correct uncapitalization of the first letter of a string while keeping the rest unchanged.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Meters } from '../../src/utils/String.js';

describe('Meters.String.uncapitalize()', function () {
  it('should uncapitalize the first letter of an uppercase word', function () {
    expect(Meters.String.uncapitalize('Hello')).to.equal('hello');
  });

  it('should not change an already uncapitalized word', function () {
    expect(Meters.String.uncapitalize('hello')).to.equal('hello');
  });

  it('should only uncapitalize the first letter', function () {
    expect(Meters.String.uncapitalize('HELLO')).to.equal('hELLO');
  });

  it('should not modify numbers at the start of a string', function () {
    expect(Meters.String.uncapitalize('123Hello')).to.equal('123Hello');
  });

  it('should return an empty string when given an empty string', function () {
    expect(Meters.String.uncapitalize('')).to.equal('');
  });

  it('should uncapitalize a single character string', function () {
    expect(Meters.String.uncapitalize('A')).to.equal('a');
  });

  it('should handle special characters like accented letters', function () {
    expect(Meters.String.uncapitalize('ÄBC')).to.equal('äBC');
  });

  it('should only uncapitalize the first word in a sentence', function () {
    expect(Meters.String.uncapitalize('Hello World')).to.equal('hello World');
  });
});