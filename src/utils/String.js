/**
 * Meters.String namespace for string-related utility functions.
 * @namespace Meters.String
 */
export const Meters = {
  String: {
    /**
     * Capitalizes the first letter of a string.
     *
     * @param {string} str - The input string.
     * @returns {string} - The capitalised string.
     * @example
     * console.log(Meters.String.capitalize("hello")); // "Hello"
     */
    capitalize (str) {
      if (!str || typeof str !== 'string') return ''
      return str.charAt(0).toUpperCase() + str.slice(1)
    },

    /**
     * Trims whitespace from both ends of a string.
     *
     * @param {string} str - The input string.
     * @returns {string} - The trimmed string.
     * @example
     * console.log(Meters.String.trim("  hello  ")); // "hello"
     */
    trim (str) {
      if (!str || typeof str !== 'string') return ''
      return str.trim()
    }
  }
}