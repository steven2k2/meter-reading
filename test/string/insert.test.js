/**
 * @file Mocha test suite for `insert` function in Meters.String.
 * @description Ensures correct substring insertion at specified positions.
 */

const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.insert()', function () {
  it("should insert at a specific index", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", 3), "abchdefg");
  });

  it("should insert at the start when index is 0", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", 0), "habcdefg");
  });

  it("should append at the end if index is larger than the string length", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", 10), "abcdefgh");
  });

  it("should handle an empty string properly", function () {
    assert.strictEqual(Meters.String.insert("", "h", 0), "h");
  });

  it("should insert at the correct position when using negative indices", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", -1), "abcdefhg");
  });

  it("should insert at the start if negative index is out of bounds", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", -10), "habcdefg");
  });

  it("should insert at the end if index is excessively large", function () {
    assert.strictEqual(Meters.String.insert("abcdefg", "h", 100), "abcdefgh");
  });

  it("should insert a word at the end", function () {
    assert.strictEqual(Meters.String.insert("hello", " world", 5), "hello world");
  });

  it("should insert before the first character when negative index matches string length", function () {
    assert.strictEqual(Meters.String.insert("start", "ing", -5), "ingstart");
  });
});