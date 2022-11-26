import fs from 'fs'
import multer from 'multer'
import AppConfig from '../config/app-config.js'

export const defaultStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = AppConfig.instance().getConfig('assetsLocation')
    try {
      if (!fs.existsSync(dest)) {
        fs.mkdir(dest, () => { cb(null, dest) } )
        return
      }
      cb(null, dest)

    } catch(err) {
      cb(new Error(`Unable to upload`), dest)
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const defaultUploadLimits = {
  fieldSize: '20MB'
}