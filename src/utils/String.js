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

    /**
     * Inserts line breaks into a string when text exceeds a specified length.
     * Preserves **existing newlines and formatting** while ensuring words are not split.
     * If a line is longer than `length`, it will be truncated using the `ellipsis` function.
     * Removes any extra spaces **but respects existing indents and lists**.
     *
     * @param {string} text - The input string.
     * @param {number} length - The maximum allowed length per line.
     * @returns {string} - The formatted string with line breaks.
     */
    static addBreaks (text, length) {
      if (!text) return ''

      return text
        .split(/(\r?\n)/) // Preserve existing newlines
        .map(segment => {
          if (segment.match(/\r?\n/)) return segment // Keep newlines

          const trimmedSegment = segment.replace(/\s+/g, ' ').trim() // Normalize spaces but keep structure
          const words = trimmedSegment.split(' ')
          const lines = []
          let currentLine = ''

          for (const word of words) {
            if (currentLine.length + word.length + 1 > length) {
              if (currentLine.length === 0) {
                // If a single word itself exceeds length, truncate the entire line
                lines.push(this.ellipsis(word, length))
              } else {
                lines.push(currentLine.trim())
                currentLine = word
              }
            } else {
              currentLine += (currentLine ? ' ' : '') + word
            }
          }

          if (currentLine) lines.push(currentLine.trim())

          return lines.map(line => line.length > length ? this.ellipsis(line, length) : line).join('\n')
        })
        .join('')
    }

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

    static insert (s = '', value = '', index = s.length) {
      index = Math.max(0, index < 0 ? s.length + index : index) // Ensure valid index
      return `${s.slice(0, index)}${value}${s.slice(index)}`
    }

    /**
     * Aggressively compacts text by removing all spaces first and then truncating it
     * using the existing `ellipsis` function for consistent truncation behaviour.
     *
     * @param {string} text - The input string.
     * @param {number} length - The maximum allowed length before truncation.
     * @returns {string} - The compacted and truncated string.
     */
    static squash (text, length) {
      if (!text) return ''
      return this.ellipsis(text.replace(/\s+/g, ''), length) // Always apply `ellipsis`
    }

    /**
     * Uncapitalises the first letter of a given string.
     * @param {string} str - The input string.
     * @returns {string} - The uncapitalised string.
     */
    static uncapitalize (str = '') {
      return str ? str.charAt(0).toLowerCase() + str.slice(1) : ''
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
