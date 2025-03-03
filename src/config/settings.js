/**
 * @module settings
 * @description
 * This module provides application-wide settings.
 *
 * @property {string} companyName - The name of the company.
 * @property {boolean} lowReadingCheck - Whether to check for low readings.
 * @property {boolean} showEstimate - Whether to show estimated readings.
 * @property {string} utilityType - The type of utility (e.g., "GAS", "WATER").
 */
const settings = {
  companyName: 'Watertown Shire',
  lowReadingCheck: true,
  showEstimate: true,
  utilityType: 'GAS'
}

export default settings
