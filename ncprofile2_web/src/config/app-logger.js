import winston from 'winston'

class Logger {

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
      //   new winston.transports.File({ filename: 'combined.log' })
      ]
    });
    this.logger.info("Initialize Logger")
  }
}

export default class AppLogger {
  constructor () {
    throw new Error("Constructor is not available")
  }

  static init() {
    if (!this._instance) {
      this._instance = new Logger()
    }
  }

  static getLogger() {
    if (!this._instance) {
      throw new Error("Logger hasn't been created")
    }
    return this._instance.logger
  }
}
