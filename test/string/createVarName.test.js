/**
 * @file createVarName.test.js
 * @module createVarName.test
 * @description Unit tests for the `createVarName` function in the `Meters.String` utility module.
 *
 * Ensures valid JavaScript variable names are generated from strings.
 *
 * @requires chai
 * @requires mocha
 * @requires ../../src/utils/String.js
 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Meters } from '../../src/utils/String.js';

describe('Meters.String.createVarName()', function () {
  it('should allow already valid variable names', function () {
    expect(Meters.String.createVarName('helloWorld')).to.equal('helloWorld');
  });

  it('should remove leading numbers', function () {
    expect(Meters.String.createVarName('123abc')).to.equal('abc');
  });

  it('should remove leading underscores', function () {
    expect(Meters.String.createVarName('___testVar')).to.equal('testVar');
  });

  it('should remove dashes', function () {
    expect(Meters.String.createVarName('my-var-name')).to.equal('myvarname');
  });

  it('should remove special characters', function () {
    expect(Meters.String.createVarName('@special$')).to.equal('special'); // Fix this if all special chars should be removed
  });

  it('should allow numbers after letters', function () {
    expect(Meters.String.createVarName('some123value')).to.equal('some123value');
  });

  it('should return an empty string if input is empty', function () {
    expect(Meters.String.createVarName('')).to.equal('');
  });

  it('should return an empty string if input contains only numbers', function () {
    expect(Meters.String.createVarName('123')).to.equal('');
  });
});