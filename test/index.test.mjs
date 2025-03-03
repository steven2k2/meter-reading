/**
 * @file index.test.mjs
 * @module index.test
 * @description Entry point for all Mocha tests in the project.
 *
 * Dynamically imports all test files to ensure compatibility with ESM.
 * This allows running tests without explicitly requiring CommonJS.
 *
 * @requires chai
 * @requires mocha
 */

const testFiles = [
  './string/capitalize.test.mjs',
  // './string/addBreaks.test.mjs',
  // './string/createVarName.test.mjs',
  // './string/escape.test.mjs',
  // './string/insert.test.mjs',
  // './string/squash.test.mjs',
  // './string/uncapitalize.test.mjs'
];

// Dynamically import each test file
await Promise.all(testFiles.map((file) => import(file)));
