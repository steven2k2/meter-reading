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
  // './string/capitalize.test.js',
  // './string/addBreaks.test.js',
  // './string/createVarName.test.js',
  // './string/escape.test.js',
  //  './string/insert.test.js',
  //  './string/squash.test.js',
  //  './string/uncapitalize.test.js',
  // './settings.test.js',
  './settings-test2.js'
]

// Dynamically import each test file
await Promise.all(testFiles.map((file) => import(file)))
