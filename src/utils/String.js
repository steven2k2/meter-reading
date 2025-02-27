// src/utils/String.js

/**
 * @file Provides string manipulation utilities under the `Meters.String` namespace.
 * @namespace Meters.String
 * @description
 * A collection of static string manipulation methods, including capitalisation,
 * uncapitalisation, and text truncation with ellipsis support.
 */
export const Meters = {
  String: class {
    static escapeRe = /['\\]/g // Matches both ' and \ globally
    static varReplace = /(^[^a-zA-Z]*|\W)/g // Ensure it removes leading non-letters and non-alphanumeric characters

    // endsWith

    /**
     * Capitalises the first letter of a given string.
     * @param {string} str - The input string.
     * @returns {string} - The capitalised string.
     */
    static capitalize (str = '') {
      return str ? str[0].toUpperCase() + str.slice(1) : ''
    }

    /**
     * Converts a string of characters into a legal, parse-able JavaScript `var` name
     * as long as the passed string contains at least one alphabetic character.
     * Non-alphanumeric characters, and *leading* non-alphabetic characters will be removed.
     * @param {String} s A string to be converted into a `var` name.
     * @return {String} A legal JavaScript `var` name.
     */
    static createVarName (s) {
      // Guard statements
      if (typeof s !== 'string' || !s.match(/[a-zA-Z]/)) return ''
      return s.replace(this.varReplace, '')
    }

    /**
     * Escapes the passed string for ' and \.
     * @param {string} string The string to escape.
     * @return {string} The escaped string.
     */
    static escape (string) {
      return string.replace(this.escapeRe, '\\$&')
    }

    static insert (s, value, index) {
      // Guard statements
      if (!s) return value || ''
      if (!value) return s

      const len = s.length

      if (index == null) index = len

      // Handle negative index (insert from the end)
      if (index < 0) {
        // ensure position isn't less than start
        index = Math.max(0, len + index)
      }

      return `${s.slice(0, index)}${value}${s.slice(index)}`
    }

    /**
     * Uncapitalises the first letter of a given string.
     * @param {string} str - The input string.
     * @returns {string} - The uncapitalised string.
     */
    static uncapitalize (str = '') {
      return str ? str.charAt(0).toLowerCase() + str.slice(1).toLowerCase() : ''
    }

    /**
     * Truncates a string and adds an ellipsis ('…') to the end if it exceeds
     * the specified length.
     * If `word` is `true`, attempts to find a common word break before truncating.
     *
     * @param {string} value - The string to truncate.
     * @param {number} length - The maximum length to allow before truncating.
     * @param {boolean} [word=false] - If `true`, tries to break at the last space or punctuation.
     * @returns {string} - The truncated text with an appended ellipsis.
     */
    static ellipsis (value, length, word = false) {
      if (!value || value.length <= length) {
        return value
      }

      // Start by truncating the string at the specified length minus 1 character.
      // This ensures there is room for the ellipsis character ('…').
      let truncated = value.substring(0, length - 1)

      if (word) {
        // Try to find the last occurrence of a space or punctuation mark
        // within the truncated text.
        // This helps avoid cutting words abruptly.
        const index = Math.max(
          truncated.lastIndexOf(' '), // Space
          truncated.lastIndexOf('.'), // Period
          truncated.lastIndexOf('!'), // Exclamation mark
          truncated.lastIndexOf('?') // Question mark
        )

        // If a valid word break position is found within a reasonable range,
        // truncate the string at that point instead of a hard character limit.
        if (index !== -1 && index >= length - 15) {
          truncated = truncated.substring(0, index)
        }
      }

      return truncated.trim() + '…'
    }
  }
}
