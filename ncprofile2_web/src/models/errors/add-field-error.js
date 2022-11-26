import BasicError from "./basic-error.js";

export default class AddFieldError extends BasicError {
  constructor(msg) {
    if (typeof msg === 'string') {
      super(msg)
    } else {
      super(msg.join(', '))
    }
    
    this.status = 400
  }
}