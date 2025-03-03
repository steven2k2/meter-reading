//src/js/AssemblyInfo

/**
 * AssemblyInfo.js - A JavaScript class for application metadata.
 *
 * Provides details such as title, version, company, and more,
 * similar to Microsoft.VisualBasic.ApplicationServices.AssemblyInfo.
 */
class AssemblyInfo {
  constructor () {
    this.title = 'MeterTrack'
    this.description = 'Mobile Meter Reading'
    this.company = 'DSKY Ltd.'
    this.product = 'MeterTrack'
    this.version = '1.0.0'
    this.copyright = '© 2024 - 2025 DSKY Ltd.'
    this.trademark = ''
    this.workingSet = this.getMemoryUsage()
  }

  /**
   * Gets the memory usage of the current process (Node.js only).
   * Returns `null` in browser environments.
   * @returns {number|null} Memory usage in bytes, or null if unavailable.
   */
  getMemoryUsage () {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().rss
    }
    return null
  }

  /**
   * Gets all assembly metadata as an object.
   * @returns {Object} Application metadata.
   */
  getInfo () {
    return {
      title: this.title,
      description: this.description,
      company: this.company,
      product: this.product,
      version: this.version,
      copyright: this.copyright,
      trademark: this.trademark,
      workingSet: this.workingSet
    }
  }

  /**
   * Returns a formatted string representation of the assembly information.
   * @returns {string} Application metadata in string format.
   */
  toString () {
    return `${this.title} - ${this.product} (v${this.version})\n` +
      `${this.description}\n` +
      `Company: ${this.company}\n` +
      `Memory Usage: ${this.workingSet ? `${this.workingSet} bytes` : 'N/A'}`
  }
}

// Example Usage
const appInfo = new AssemblyInfo()
console.log(appInfo.toString())

export default AssemblyInfo
