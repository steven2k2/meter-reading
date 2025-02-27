/**
 * @file Mocha test suite for `createVarName` function in Meters.String.
 * @description Ensures valid JavaScript variable names are generated from strings.
 */

const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.createVarName()', function () {
  it("should allow already valid variable names", function () {
    assert.strictEqual(Meters.String.createVarName("helloWorld"), "helloWorld");
  });

  it("should remove leading numbers", function () {
    assert.strictEqual(Meters.String.createVarName("123abc"), "abc");
  });

  it("should remove leading underscores", function () {
    assert.strictEqual(Meters.String.createVarName("___testVar"), "testVar");
  });

  it("should remove dashes", function () {
    assert.strictEqual(Meters.String.createVarName("my-var-name"), "myvarname");
  });

  it("should remove special characters", function () {
    assert.strictEqual(Meters.String.createVarName("@special$"), "special"); // Fix this if all special chars should be removed
  });

  it("should allow numbers after letters", function () {
    assert.strictEqual(Meters.String.createVarName("some123value"), "some123value");
  });

  it("should return an empty string if input is empty", function () {
    assert.strictEqual(Meters.String.createVarName(""), "");
  });

  it("should return an empty string if input contains only numbers", function () {
    assert.strictEqual(Meters.String.createVarName("123"), "");
  });
});