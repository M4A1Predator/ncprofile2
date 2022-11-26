export default class FieldsRepo {
  constructor(dbManager) {
    this.db = dbManager.db
  }

  async initFieldsDB() {
    this.db.data.fields = []
    await this.db.write()
  }

  async addFields(fields) {
    fields.forEach(f => {
      this.db.data.fields.push(f)
    })
    await this.db.write()
  }

  async upsertFields(fields) {
    this.db.fields = fields
    await this.db.write()
  }

  getFields() {
    return this.db.data.fields
  }
}