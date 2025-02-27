# Capitalize Function Tests

## **Description**

The `capitalize` function converts the first letter of a given string to uppercase while leaving the rest unchanged.

---

## **Test Cases**

| **Input**       | **Expected Output** | **Explanation**                                |
|-----------------|---------------------|------------------------------------------------|
| `"hello"`       | `"Hello"`           | Converts the first letter to uppercase         |
| `"Hello"`       | `"Hello"`           | Already capitalized, remains unchanged         |
| `"hELLO"`       | `"HELLO"`           | Only affects the first letter                  |
| `"123hello"`    | `"123hello"`        | Numbers remain unchanged                       |
| `""`            | `""`                | Empty string remains unchanged                 |
| `"a"`           | `"A"`               | Single-letter string gets capitalized          |
| `"äbc"`         | `"Äbc"`             | Works with special characters (e.g., `ä`)      |
| `"hello world"` | `"Hello world"`     | Only the first letter of the string is changed |

---

## **Mocha Test Code**

The following **Mocha test suite** ensures that the `capitalize` function behaves correctly.

```javascript
const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.capitalize()', function () {
  it('should capitalize the first letter of a lowercase word', function () {
    assert.strictEqual(Meters.String.capitalize('hello'), 'Hello');
  });

  it('should not change an already capitalized word', function () {
    assert.strictEqual(Meters.String.capitalize('Hello'), 'Hello');
  });

  it('should only capitalize the first letter', function () {
    assert.strictEqual(Meters.String.capitalize('hELLO'), 'HELLO');
  });

  it('should not modify numbers at the start of a string', function () {
    assert.strictEqual(Meters.String.capitalize('123hello'), '123hello');
  });

  it('should return an empty string when given an empty string', function () {
    assert.strictEqual(Meters.String.capitalize(''), '');
  });

  it('should capitalize a single character string', function () {
    assert.strictEqual(Meters.String.capitalize('a'), 'A');
  });

  it('should handle special characters like accented letters', function () {
    assert.strictEqual(Meters.String.capitalize('äbc'), 'Äbc');
  });

  it('should only capitalize the first word in a sentence', function () {
    assert.strictEqual(Meters.String.capitalize('hello world'), 'Hello world');
  });
});