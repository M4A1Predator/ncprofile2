import fs from 'fs'
import AppConfig from '../config/app-config.js'


export default class FilesService {
  constructor() {
    this._assetsLocation = AppConfig.instance().getConfig('assetsLocation')
  }

  getFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(this._assetsLocation, (err, files) => {
        if (err) {
          reject(err)
          return
        }
        const result = {
          files: files.map(f => { return { name: f } })
        }
        resolve(result)
      })
    })
      
  }
}
