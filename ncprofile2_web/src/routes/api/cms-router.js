import express from 'express'
import ContainerFactory from '../../container.js'
import AddFieldError from '../../models/errors/add-field-error.js'
import { defaultStorage, defaultUploadLimits } from '../../helpers/uploader-util.js'
import multer from 'multer'
import { getFileType } from '../../helpers/file-helper.js'
import { ServeFileError } from '../../models/errors/files-error.js'

const cmsRouter = express.Router()
const container = ContainerFactory.instance()

const uploader = multer({ storage: defaultStorage, limits: defaultUploadLimits })

// ******************************
// Fields endpoint
cmsRouter.get('/fields', async (req, res) => {
  const fieldsService = container.FieldsService
  const fields = fieldsService.getFields()
  res.json({
    fields
  })
})

cmsRouter.post('/fields', async (req, res, next) => {
  try {
    const fieldsService = container.FieldsService
    await fieldsService.addFields(req.body)
    
    // add field
    res.status(200).json({ message: 'success' })
  } catch(err) {
    if (err instanceof AddFieldError) {
      res.status(err.status).json(err.getErrorBody())
      return;
    }
    next(err)
  }
})

// ***********************
// Files endpoith
cmsRouter.post('/file', uploader.single('file'), async (req, res, next) => {
  try {
    res.json({ message: `Uploaded file ${req.file.originalname}` })
  } catch(err) {
    next(err)
  }
})

cmsRouter.get('/files', async (req, res, next) => {
  try {
    const filesService = container.FilesService
    const result = await filesService.getFiles()
    res.json(result)
  } catch(err) {
    next(err)
  }
})

cmsRouter.get('/files/:path', async (req, res, next) => {
  try {
    const filesService = container.FilesService
    const readStream = await filesService.getFileBytes(req.params.path)
    res.set('Content-Type', getFileType(req.params.path))
    readStream.pipe(res)
  } catch(err) {
    if (err instanceof ServeFileError) {
      res.status(err.status).json(err.getErrorBody())
      return
    }
    next(err)
  }
})

// ********************
// HTML
cmsRouter.get('/htmls', async (req, res, next) => {
  try{
    const filesService = container.FilesService
    const result = await filesService.getHtmlFiles()
    res.json(result)
  } catch(err) {
    next(err)
  }
})

cmsRouter.post('/html', async (req, res, next) => {
  try {
    const filesService = container.FilesService
    await filesService.saveHtmlFile(req.body)
    res.json({ message: 'updated' })
  } catch(err) {
    next(err)
  }
})

export default cmsRouter
