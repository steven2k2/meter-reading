/**
 * Meters.String provides utility functions for string manipulation.
 * @namespace Meters.String
 */
export class MetersString {
  /**
   * Capitalizes the first letter of a string.
   *
   * @param {string} str - The input string.
   * @returns {string} - The capitalized string.
   * @example
   * console.log(MetersString.capitalize("hello")); // "Hello"
   */
  static capitalize (str) {
    if (typeof str !== 'string' || str.length === 0) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * Trims whitespace from both ends of a string.
   *
   * @param {string} str - The input string.
   * @returns {string} - The trimmed string.
   * @example
   * console.log(MetersString.trim("  hello  ")); // "hello"
   */
  static trim (str) {
    if (typeof str !== 'string') return ''
    return str.trim()
  }
}