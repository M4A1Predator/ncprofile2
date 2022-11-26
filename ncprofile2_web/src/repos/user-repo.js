export default class UserRepo {

  constructor(dbManager) {
    this.db = dbManager.db
  }

  async saveUser(user) {
    this.db.data.admin = user
    await this.db.write()
  }

  getAdmin() {
    return this.db.data.admin
  }

}