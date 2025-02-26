// src/utils/MeterString

/**
 * MetersString provides utility functions for string manipulation.
 * @namespace Meters.String
 */
export class MetersString {
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
   * Truncate a string and add an ellipsis ('…') to the end if it exceeds
   * the specified length.
   * @param {String} value The string to truncate.
   * @param {Number} length The maximum length to allow before truncating.
   * @param {Boolean} [word=false] `true` to try to find a common word break.
   * @return {String} The converted text.
   */
  static ellipsis (value, length, word = false) {
    if (!value || value.length <= length) {
      return value
    }

    let truncated = value.substring(0, length - 1)

    if (word) {
      const index = Math.max(
        truncated.lastIndexOf(' '),
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf('!'),
        truncated.lastIndexOf('?')
      )

      if (index !== -1 && index >= length - 15) {
        truncated = truncated.substring(0, index)
      }
    }

    return truncated.trim() + '…'
  }
}
