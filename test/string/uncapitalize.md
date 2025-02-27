# Uncapitalize Function Tests

## **Description**

The `uncapitalize` function converts the first letter of a given string to lowercase while leaving the rest unchanged.

---

## **Test Cases**

| **Input**       | **Expected Output** | **Explanation**                                |
|-----------------|---------------------|------------------------------------------------|
| `"Hello"`       | `"hello"`           | Converts the first letter to lowercase         |
| `"hello"`       | `"hello"`           | Already lowercase, remains unchanged           |
| `"HELLO"`       | `"hELLO"`           | Only affects the first letter                  |
| `"123Hello"`    | `"123Hello"`        | Numbers remain unchanged                       |
| `""`            | `""`                | Empty string remains unchanged                 |
| `"A"`           | `"a"`               | Single-letter string gets uncapitalized        |
| `"ÄBC"`         | `"äBC"`             | Works with special characters (e.g., `Ä`)      |
| `"Hello World"` | `"hello World"`     | Only the first letter of the string is changed |

---

## **Mocha Test Code**

The following **Mocha test suite** ensures that the `uncapitalize` function behaves correctly.

```javascript
const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.uncapitalize()', function () {
  it('should uncapitalize the first letter of an uppercase word', function () {
    assert.strictEqual(Meters.String.uncapitalize('Hello'), 'hello');
  });

  it('should not change an already uncapitalized word', function () {
    assert.strictEqual(Meters.String.uncapitalize('hello'), 'hello');
  });

  it('should only uncapitalize the first letter', function () {
    assert.strictEqual(Meters.String.uncapitalize('HELLO'), 'hELLO');
  });

  it('should not modify numbers at the start of a string', function () {
    assert.strictEqual(Meters.String.uncapitalize('123Hello'), '123Hello');
  });

  it('should return an empty string when given an empty string', function () {
    assert.strictEqual(Meters.String.uncapitalize(''), '');
  });

  it('should uncapitalize a single character string', function () {
    assert.strictEqual(Meters.String.uncapitalize('A'), 'a');
  });

  it('should handle special characters like accented letters', function () {
    assert.strictEqual(Meters.String.uncapitalize('ÄBC'), 'äBC');
  });

  it('should only uncapitalize the first word in a sentence', function () {
    assert.strictEqual(Meters.String.uncapitalize('Hello World'), 'hello World');
  });
});