import fs from 'fs'
import path from 'path'
import AppConfig from '../config/app-config.js'
import { ServeFileError } from '../models/errors/files-error.js'
import fsp from 'fs/promises'
import AppLogger from '../config/app-logger.js'

export default class FilesService {
  constructor() {
    this._logger = AppLogger.getLogger()
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

  getFileBytes(filePath) {
    const readPath = path.join(this._assetsLocation, filePath)
    const s = fs.createReadStream(readPath)
    return new Promise((resolve, reject) => {
      s.on('open', () => {
        resolve(s)
      })

      s.on('error', (err) => {
        reject(new ServeFileError(err.message))
      })
    })
  }

  async saveHtmlFile(content) {
    try {
      const dest = path.join(this._assetsLocation, "html")
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest)
      }

      const data = {
        name: this._getFileNameFromText(content),
        text: content
      }

      const htmlFile = path.join(dest, data.name + ".html")
      await fsp.writeFile(htmlFile, data.text)
    } catch (err) {
      this._logger.error(`Can't save html file ${err}`)
      throw err
    }
  }

  _getFileNameFromText(content) {
    const firstLine = content.split('\n')[0]
    return firstLine.replace('<!--', '').replace('-->', '').trim().replace(' ', '')
  }

  async getHtmlFiles() {
    const resourceDir = path.join(this._assetsLocation, "html")
    const htmlFiles = await fsp.readdir(resourceDir)
    return {
      files: htmlFiles.map((f) => { return { name: f }})
    }
  }
}
