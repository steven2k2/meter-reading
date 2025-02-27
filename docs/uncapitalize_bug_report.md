# 🐞 Bug Report: `uncapitalize` Function Fails on Multi-Word Strings

## **Issue Summary**

The `uncapitalize` function does **not correctly handle sentences (multi-word strings)**.  
It **uncapitalizes the entire string instead of only the first letter**.

---

## **Steps to Reproduce**

1. Call `Meters.String.uncapitalize('Hello World')`.
2. Expected output: `'hello World'`
3. Actual output: `'hello world'` (incorrect)

---

## **Error Log**

```plaintext
      AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
+ actual - expected

+ 'hello world'
- 'hello World'
         ^
```

---

## **Action Items**

- [ ] **Update `uncapitalize` function to correctly modify only the first letter**
- [ ] **Run Mocha tests to verify the fix**
- [ ] **Commit and push changes**

---

## **References**

- **Related Test File:** `test/string/uncapitalize.test.js`

---

## **Ticket Metadata**

- **Status:** Open
- **Priority:** High (fix is small but functionally important)
- **Assigned To:** _Me_
- **Created By:** _Me_
- **Date:** _2025-02-27_

---

### **Example Git Commit for the Fix**

```bash
git commit -m "🐞 Fix uncapitalize: Ensure only the first letter is lowercased"
```