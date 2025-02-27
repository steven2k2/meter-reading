/**
 * @file Mocha test suite for `escape` function in Meters.String.
 * @description Ensures proper escaping of single quotes and backslashes.
 */

const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.escape()', function () {
  it("should not modify a string without special characters", function () {
    assert.strictEqual(Meters.String.escape("hello"), "hello");
  });

  it("should escape single quotes", function () {
    assert.strictEqual(Meters.String.escape("it's a test"), "it\\'s a test");
  });

  it("should escape backslashes", function () {
    assert.strictEqual(Meters.String.escape("C:\\Users\\name"), "C:\\\\Users\\\\name");
  });

  it("should escape both single quotes and backslashes", function () {
    assert.strictEqual(Meters.String.escape("John's \\ path"), "John\\'s \\\\ path");
  });

  it("should escape multiple single quotes", function () {
    assert.strictEqual(Meters.String.escape("''"), "\\'\\'");
  });

  it("should escape multiple backslashes", function () {
    assert.strictEqual(Meters.String.escape("\\\\"), "\\\\\\\\");
  });

  it("should return an empty string if input is empty", function () {
    assert.strictEqual(Meters.String.escape(""), "");
  });

  it("should not modify a string that does not require escaping", function () {
    assert.strictEqual(Meters.String.escape("NoEscapeNeeded"), "NoEscapeNeeded");
  });
});