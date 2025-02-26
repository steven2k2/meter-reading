// src/utils/String.js

/**
 * @file Provides string manipulation utilities under the `Meters.String` namespace.
 * @namespace Meters.String
 * @description
 * A collection of static string manipulation methods, including capitalization,
 * uncapitalization, and text truncation with ellipsis support.
 */
export const Meters = {
  String: class {
    /**
     * Capitalises the first letter of a given string.
     * @param {string} str - The input string.
     * @returns {string} - The capitalised string.
     */
    static capitalize (str = '') {
      return str ? str[0].toUpperCase() + str.slice(1) : ''
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

      // Trim any trailing spaces and append the ellipsis character.
      return truncated.trim() + '…'
    }
  }
}
