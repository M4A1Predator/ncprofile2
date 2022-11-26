export default class ErrorRes {
  constructor() {
    this.errors = []
    this.status = 500
  }

  getErrorBody () {
    return {
      errors: this.errors
    }
  }
}