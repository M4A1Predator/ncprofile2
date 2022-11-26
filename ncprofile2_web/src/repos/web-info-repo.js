export default class WebInfoRepo {

  constructor(dbManager) {
    this.db = dbManager.db
  }

  async saveWebInfo (info) {
    this.db.data.info = info
    await this.db.write()
  }

  getWebInfo () {
    return this.db.data.info
  }

}