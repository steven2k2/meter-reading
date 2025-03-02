class MainModule {
  static APP_PATH = "/Program Files/MetersMobile";
  static STORAGE = "/SD-MMC Card";
  static Bullet = "●";
  static SDCard = "/SD-MMC Card";

  constructor() {
    this.mobile2003 = this.isMobile2003();
    this.storageCard = null;
    this.gSettings = {}; // Placeholder for settings
    this.application = null;
  }

  /**
   * Placeholder for getting storage card names.
   * Browser-based JavaScript cannot access the local file system.
   */
  static getStorageCardNames() {
    console.warn("getStorageCardNames() is not available in browser JavaScript.");
    return [];
  }

  /**
   * Determines if the system is running on Mobile 2003.
   * @returns {boolean} True if running on Mobile 2003, otherwise false.
   */
  isMobile2003() {
    return navigator.userAgent.includes("Windows CE"); // Best approximation
  }

  /**
   * Main startup routine for the application.
   */
  main() {
    console.log("Starting application...");

    if (!this.mobile2003) {
      console.log("Not running on Mobile 2003.");
    }

    console.log("MainForm.showDialog()");

    if (this.application) {
      console.log("Disposing application...");
    }

    console.log("Exiting application...");
  }
}

export default MainModule;
