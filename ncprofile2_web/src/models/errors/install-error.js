import BasicError from "./basic-error.js";

export default class InstallError extends BasicError {

  constructor(message) {
    const errMsg = message || "Install Error"
    super(errMsg)
    this.status = 500
  }

}