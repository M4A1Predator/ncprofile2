import AppLogger from "./app-logger.js"

class Config {
  constructor(config) {
    this._config = config
  }

  getConfig(key) {
    return this._config[key]
  }
}

export default class AppConfig {
  constructor () {
    throw new Error("Constructor is not available")
  }

  static init(config) {
    this._logger = AppLogger.getLogger()
    this._logger.info("Intialize Application Config")
    if (!this._instance) {
      this._instance = new Config(config)
    }
  }

  static instance() {
    if (!this._instance) {
      throw new Error("AppConfig hasn't been created")
    }
    return this._instance
  }
}