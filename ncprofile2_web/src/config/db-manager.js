import AppLogger from "./app-logger.js"
// import low from 'lowdb'
// import FileSync from 'lowdb/adapters/FileSync'
import { Low, JSONFile } from 'lowdb'
import { join, dirname } from 'path'
import { fileURLToPath } from "url"

export default class DBManager {
  constructor() {
    this._logger = AppLogger.getLogger()
    this.db = null
  }

  async init({ env }) {

    const dbName = this._getDBName(env)
    // V1
    // const adapter = new FileSync(dbName)
    // this.db = new low(adapter)

    // V3
    this._logger.info("Load DB")
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const file = join(__dirname, '../../../resource', dbName)
    const adapter = new JSONFile(file)
    this.db = new Low(adapter)
    await this.db.read()
    this._logger.info("Read DB")

    // init data
    await this._initMetadata()
  }

  _getDBName(env) {
    if (env === 'PROD') {
      return 'db-prod.json'
    } else {
      return 'db-dev.json'
    }
  }

  async _initMetadata() {
    if (!this.db.data) {
      this._logger.info("Write metadata")
      this.db.data = {
          meta: {
          "createdAt": (new Date()).getTime()
        }
      }

      await this.db.write()
    }
  }

}