# Squash Function Tests

## **Description**
The `squash` function **aggressively compacts text** by removing all spaces first and then truncating it to a specified length, appending an ellipsis (`…`) if necessary. The function ensures that the ellipsis itself is counted within the allowed length.

---

## **Test Cases**

| **Input**        | **Length** | **Expected Output** | **Explanation**                                  |
|-----------------|-----------|--------------------|------------------------------------------------|
| `"Hello World"` | `5`       | `"Hell…"`         | Removes spaces, truncates, and adds ellipsis  |
| `"Long sentence"` | `12`     | `"Longsentence"`  | Removes spaces but does not truncate |
| `"abcdefghijk"` | `8`       | `"abcdefg…"`     | Already compact, just truncates |
| `"short"`       | `10`      | `"short"`         | Does not exceed length, remains unchanged |
| `""`           | `5`       | `""`              | Empty string remains unchanged |
| `"A B C D E"`  | `5`       | `"ABCDE"`         | Removes spaces, then truncates |
| `"      "`      | `5`       | `""`              | Spaces are removed, leaving an empty string |

---

## **Mocha Test Code**
The following **Mocha test suite** ensures that the `squash` function behaves correctly.

```javascript
const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.squash()', function () {
  it("should remove spaces and truncate using ellipsis if necessary", function () {
    assert.strictEqual(Meters.String.squash("Hello World", 5), "Hell…");
  });

  it("should remove all spaces if required but not truncate if then within limit", function () {
    assert.strictEqual(Meters.String.squash("Long sentence", 12), "Longsentence");
  });

  it("should truncate properly using ellipsis", function () {
    assert.strictEqual(Meters.String.squash("abcdefghijk", 8), "abcdefg…");
  });

  it("should return an empty string if input is empty", function () {
    assert.strictEqual(Meters.String.squash("", 5), "");
  });

  it("should handle cases where length is greater than text length", function () {
    assert.strictEqual(Meters.String.squash("short", 10), "short");
  });

  it("should handle text containing only spaces", function () {
    assert.strictEqual(Meters.String.squash("      ", 5), "");
  });

  it("should handle special characters correctly", function () {
    assert.strictEqual(Meters.String.squash("A B C D E", 5), "ABCDE");
  });
});