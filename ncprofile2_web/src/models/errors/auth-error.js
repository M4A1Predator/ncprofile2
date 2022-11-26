import BasicError from "./basic-error.js";

export default class AuthError extends BasicError {
  constructor(msg) {
    super(msg)
    this.status = 401
  }
}
