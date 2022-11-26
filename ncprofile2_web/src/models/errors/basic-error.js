export default class BasicError extends Error {

  constructor(message) {
    super(message)
    this.status = 500
  }

  getErrorBody () {
    return {
      errors: [this.message]
    }
  }

}