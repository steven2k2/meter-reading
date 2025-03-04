/**
 * @file squash.test.js
 * @module squash.test
 * @description Unit tests for the `squash` function in the `Meters.String` utility module.
 *
 * Ensures spaces are removed and text is truncated using an ellipsis when necessary.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Meters } from '../../src/utils/String.js';

describe('Meters.String.squash()', function () {
  it('should remove spaces and truncate using ellipsis if necessary', function () {
    expect(Meters.String.squash('Hello World', 5)).to.equal('Hell…');
  });

  it('should remove all spaces if required but not truncate if then within limit', function () {
    expect(Meters.String.squash('Long sentence', 12)).to.equal('Longsentence');
  });

  it('should truncate properly using ellipsis', function () {
    expect(Meters.String.squash('abcdefghijk', 8)).to.equal('abcdefg…');
  });

  it('should return an empty string if input is empty', function () {
    expect(Meters.String.squash('', 5)).to.equal('');
  });

  it('should handle cases where length is greater than text length', function () {
    expect(Meters.String.squash('short', 10)).to.equal('short');
  });

  it('should handle text containing only spaces', function () {
    expect(Meters.String.squash('      ', 5)).to.equal('');
  });

  it('should handle special characters correctly', function () {
    expect(Meters.String.squash('A B C D E', 5)).to.equal('ABCDE');
  });
});