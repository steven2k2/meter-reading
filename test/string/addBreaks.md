# addBreaks Function Tests

## **Description**
The `addBreaks` function is designed to **reformat old database text data**, where notes may have been split across **multiple small character fields (e.g., 60 characters per field)**. This function **preserves existing line breaks** while ensuring that long lines **wrap properly at word boundaries** without breaking words. Instead of breaking words, **entire lines that exceed the max length are truncated using the `ellipsis` function** for consistency.

---

## **Test Cases**

| **Input**                                      | **Length** | **Expected Output**                            | **Explanation**                                |
|-----------------------------------------------|-----------|----------------------------------------------|----------------------------------------------|
| ""                                            | `10`      | ""                                          | Empty input remains unchanged                 |
| "Short text"                                  | `20`      | "Short text"                                | Within the limit, so remains unchanged       |
| "This is    a test     with  irregular spacing." | `10`      | "This is a\ntest with\nirregular\nspacing." | Reduces multiple spaces and wraps text correctly |
| "This is a long sentence that should be wrapped properly." | `15`      | "This is a long\nsentence that\nshould be\nwrapped\nproperly." | Breaks text at spaces to fit within `15` characters |
| "Old DB data stored in 60 char fields.\nAnother sentence follows." | `20` | "Old DB data stored\nin 60 char fields.\nAnother sentence\nfollows." | Wraps long stored database text efficiently while keeping existing newlines |
| "Supercalifragilisticexpialidocious"         | `10`      | "Supercalif…"        | Extremely long lines are truncated using `ellipsis`  |
| "Line 1\nLine 2"                              | `10`      | "Line 1\nLine 2"                            | Maintains original newlines                  |
| "A single longwordwithoutspaces"            | `10`      | "A\nsingle\nlongword…"          | Truncates entire lines exceeding the length |

---

## **Updated Function**
```javascript
/**
 * Inserts line breaks into a string when text exceeds a specified length.
 * Preserves existing newlines and ensures words are not split unless necessary.
 * If a line is longer than `length`, it will be truncated using the `ellipsis` function.
 *
 * @param {string} text - The input string.
 * @param {number} length - The maximum allowed length per line.
 * @returns {string} - The formatted string with line breaks.
 */
static addBreaks(text, length) {
  if (!text) return '';

  return text
    .split(/(\r?\n)/) // Preserve existing newlines
    .map(segment => {
      if (segment.match(/\r?\n/)) return segment; // Keep newlines

      let words = segment.split(' ');
      let lines = [];
      let currentLine = '';

      for (let word of words) {
        if (currentLine.length + word.length + 1 > length) {
          if (currentLine.length === 0) {
            // If a single word itself exceeds length, truncate the entire line
            lines.push(this.ellipsis(word, length));
          } else {
            lines.push(currentLine.trim());
            currentLine = word;
          }
        } else {
          currentLine += (currentLine ? ' ' : '') + word;
        }
      }

      if (currentLine) lines.push(currentLine.trim());

      return lines.map(line => line.length > length ? this.ellipsis(line, length) : line).join('\n');
    })
    .join('');
}
```

---

## **Sample Data for Testing**
### **Example 1: Basic Note**
```
Meter ID: 123456
Location: 45A High Street
Notes: Checked meter, reading within normal range. No leaks detected.
```

### **Example 2: Long Note (Ideal for Testing Wrapping)**
```
Meter ID: 789012
Location: 10B Riverside Drive
Notes: Customer reported inconsistent readings. Inspected meter, found debris affecting accuracy.
Advised customer to clear area. Reading taken: 1245.678m³. Will monitor next cycle.
```

### **Example 3: Multi-Line Note**
```
Meter ID: 567890
Location: Apartment Complex, Block C
Notes:
- Meter difficult to access due to overgrown vegetation.
- Reading obtained: 2345.001m³.
- Maintenance requested for clearing.
- No leaks or damage observed.
```

### **Example 4: Simulated Old Database Format (Chopped Into Small Fields)**
```
Meter ID: 345678
Location: Industrial Zone
Notes: Reading recorded 789.456m³ | Meter condition good | Customer inquired about billing frequency |
Referred to support team | Follow-up visit scheduled in 2 weeks
```

### **Example 5: Unstructured Report (To Test Cleaning & Formatting)**
```
Meter ID: 910111
Location: Rural Property
Notes:  Meter covered with dirt. Cleaned and obtained reading 365.982m³.  
        Previous reading mismatch reported by customer.  
        Suggested verification from last 3 cycles.  
        No further action required at this time.
```

---

## **Mocha Test Code**
The following **Mocha test suite** ensures that the `addBreaks` function behaves correctly.

```javascript
const assert = require('assert');
const { Meters } = require('../../src/utils/String.js');

describe('Meters.String.addBreaks()', function () {
  it("should return an empty string if input is empty", function () {
    assert.strictEqual(Meters.String.addBreaks("", 10), "");
  });

  it("should not modify a string that is already within the length limit", function () {
    assert.strictEqual(Meters.String.addBreaks("Short text", 20), "Short text");
  });

  it("should remove unnecessary spaces and wrap text correctly", function () {
    assert.strictEqual(
      Meters.String.addBreaks("This is    a test     with  irregular spacing.", 10),
      "This is a\ntest with\nirregular\nspacing."
    );
  });

  it("should insert line breaks at spaces when exceeding the length", function () {
    assert.strictEqual(
      Meters.String.addBreaks("This is a long sentence that should be wrapped properly.", 15),
      "This is a long\nsentence that\nshould be\nwrapped\nproperly."
    );
  });
});
```

---

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test addBreaks Function</title>
  <style>
      body {
          font-family: Arial, sans-serif;
          margin: 20px;
      }
      textarea, pre {
          width: 100%;
          height: 150px;
          margin-top: 10px;
      }
      button {
          margin-top: 10px;
          padding: 10px;
          cursor: pointer;
      }

      pre {
          background-color: #eee;
      }
  </style>
  <script type="module">
    import { Meters } from './src/utils/String.js';

    window.testAddBreaks = function() {
      const inputText = document.getElementById("inputText").value;
      const length = parseInt(document.getElementById("lineLength").value, 10);
      const output = Meters.String.addBreaks(inputText, length);
      document.getElementById("output").textContent = output;
    }
  </script>
</head>
<body>
<h2>Test addBreaks Function</h2>
<label for="inputText">Enter text:</label>
<textarea id="inputText" placeholder="Type or paste text here..."></textarea>

<label for="lineLength">Max Line Length:</label>
<input type="number" id="lineLength" value="20">

<button onclick="testAddBreaks()">Format Text</button>

<h3>Formatted Output:</h3>
<pre id="output"></pre>
</body>
</html>


```